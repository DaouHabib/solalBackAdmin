import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Projectservice } from '../../../shared/service/newProjet.service';
import { UserService } from '../../../shared/service/user.service';
declare var THREEx:any;

@Component({
  selector: 'app-create-marker',
  templateUrl: './create-marker.component.html',
  styleUrls: ['./create-marker.component.scss']
})
export class CreateMarkerComponent implements OnInit {

  public addproject: FormGroup;
  selectedFile: File = null;
  image: any = null;
  user:any;
  isImageLoading: boolean;
  ImageOpen: boolean;
  imageToShow: any;
  imageUrl:any =null;
  idProject:any;
  constructor(private formBuilder: FormBuilder ,private userservice:UserService, private projectService:Projectservice,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public sanitization: DomSanitizer,) {
      this.addproject = this.formBuilder.group({
        markerName: new FormControl(  "" , Validators.required ),
        markerUrl: new FormControl(  "" , Validators.required ),
        imageUrl : new FormControl("" ),
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
          .subscribe((res) => {    this.imageUrl=res; 
              console.log(res)});  
       
   }
   public  getConnected(){
    this.route.paramMap.subscribe((routes: any) => {
      this.idProject=routes.params.idporject
    })
    this.userservice.getuser().subscribe(data=>{
    this.user = data;
    console.log(data);
  });
}

   add(){
    
    this.addproject.value.imageUrl=this.imageUrl;
    console.log(this.addproject.value)
this.projectService.AddmarkertoProject(this.addproject.value,this.idProject).subscribe(res=>{
  this.router.navigate( ['/animate/showMarkers/'+this.idProject]);

console.log (res);

})
   }


   ngOnInit() {
     this.getConnected();

   }



}
