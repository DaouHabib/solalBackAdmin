import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Projectservice } from '../../../shared/service/newProjet.service';
import { Produitservice } from '../../../shared/service/produit.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  public addproject: FormGroup;
  selectedFile: File = null;
  image: any = null;
  user: any;
  isImageLoading: boolean;
  ImageOpen: boolean;
  imageToShow: any;
  imageUrl: any = null;
  constructor(private formBuilder: FormBuilder, private userservice: UserService, private projectService: Projectservice,
    private router: Router,
    private http: HttpClient,
    public sanitization: DomSanitizer,) {
    this.addproject = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      imageUrl: new FormControl(""),
      userId: new FormControl(),
    })

  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  public onUploadInit(args: any): void { }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void {
    this.selectedFile = args[0];
    const fd = new FormData();
    fd.append("file", this.selectedFile);
    this.http
      .post("https://solalireality.herokuapp.com/uploads/upload", fd)
      .subscribe((res) => {
        this.imageUrl = res;
        console.log(res)
      });

  }
  public getConnected() {
    this.userservice.getuser().subscribe(data => {
      this.user = data;
    });
  }

  add() {
    this.addproject.value.userId = this.user._id;
    this.addproject.value.imageUrl = this.imageUrl;
    console.log(this.addproject.value)
    this.projectService.AddProject(this.addproject.value).subscribe(res => {

      console.log(res);
      this.router.navigate( ['/animate']);


    })
  }

  ngOnInit() {
    this.getConnected();
  }

}
