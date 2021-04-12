import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Produitservice } from '../../../../shared/service/produit.service';
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
  imageUrl:any;
  constructor(private formBuilder: FormBuilder ,private userService: UserService, private productService:Produitservice,

    private http: HttpClient,
    public sanitization: DomSanitizer,) {
      this.addproduct = this.formBuilder.group({
        title: new FormControl(  "" , Validators.required ),
        description: new FormControl( "" , Validators.required),
        new: new FormControl(),
        type: new FormControl("",  Validators.required),
        brand: new FormControl("",  Validators.required),
        category: new FormControl( "" ),
        sale: new FormControl(),
        prix: new FormControl(0,Validators.required),
        stock: new FormControl(0,  Validators.required),
        imageUrl : new FormControl(""),
        discount:new FormControl(0),
        userId : new FormControl(),
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


   add(){
    this.addproduct.value.userId=this.id;
    this.addproduct.value.imageUrl=this.imageUrl;
    console.log(this.addproduct.value)
this.productService.AddProduit(this.addproduct.value).subscribe(res=>{

console.log (res);

})
   }

  ngOnInit() {
  }

}
