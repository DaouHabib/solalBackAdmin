import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UserService } from '../../../../shared/service/user.service';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})
export class DigitalAddComponent implements OnInit {
  public addproduct: FormGroup;
  selectedFile: File = null;
  image: any = null;
  isImageLoading: boolean;
  ImageOpen: boolean;
  user : any;
  imageToShow: any;
  id= localStorage.getItem("connectedId");
  constructor(private formBuilder: FormBuilder ,private userService: UserService,
    private http: HttpClient,
    public sanitization: DomSanitizer,) {
      this.addproduct = this.formBuilder.group({
        title: new FormControl(  "" , Validators.required ),
        description: new FormControl( "" , Validators.required),
        new: new FormControl(),
        type: new FormControl("",  Validators.required),
        brand: new FormControl(0,  Validators.required),
        category: new FormControl( "" ),
        sale: new FormControl(),
        price: new FormControl(0,Validators.required),
        stock: new FormControl(0,  Validators.required),
  
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
          .post("http://localhost:3000/uploads/upload", fd)
          .subscribe((res) => {
              console.log(res)});  
   }


   add(){

    console.log(this.addproduct.value)

   }

  ngOnInit() {
  }

}
