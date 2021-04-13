import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedFile: File = null;
  image: any = null;
  isImageLoading: boolean;
  ImageOpen: boolean;
  user : any;
  imageToShow: any;

  constructor(private userService: UserService,
    private http: HttpClient,
    public sanitization: DomSanitizer,) { }
    public config1: DropzoneConfigInterface = {
      clickable: true,
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null
    };
  
    public onUploadInit(args: any): void { }
  
    public onUploadError(args: any): void { }
  
    public onUploadSuccess(args: any): void {    this.selectedFile = args[0];
      const fd = new FormData();
      fd.append("file", this.selectedFile);
      this.http
          .post("http://localhost:3000/uploads/upload", fd)
          .subscribe((res) => {
              const UserT = this.user;
              UserT.imageUrl = res;
              this.userService.edit(UserT, this.user._id).subscribe(
                  user => {
                    console.log(user);
                      this.ImageOpen=false;
                      this.getConnected();
  
                  },
                  err => {
                      this.ImageOpen=false;
  
                  }
              );
              console.log(res)});  
    }
    public  getConnected(){
      this.userService.getuser().subscribe(data=>{
      this.user = data;
      console.log(data);
          this.getImageFromService(data);
    });
   
   }
    onFileSelected(event) {
      this.selectedFile = <File>event.target.files[0];
  }
    onUpload() {
      const fd = new FormData();
      fd.append("file", this.selectedFile);
      this.http
          .post("http://localhost:3000/uploads/upload", fd)
          .subscribe((res) => {
              const UserT = this.user;
              UserT.imageUrl = res;
              this.userService.edit(UserT, this.user._id).subscribe(
                  user => {
                    console.log(user);
                      this.ImageOpen=false;
                      this.getConnected();
  
                  },
                  err => {
                      this.ImageOpen=false;
  
                  }
              );
              console.log(res)});
  }
    openPhotoEdit(){
      this.ImageOpen=true;
      }
    createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener(
          "load",
          () => {
              this.imageToShow = this.sanitization.bypassSecurityTrustResourceUrl(
                  reader.result.toString()
              );
          },
          false
      );
  
      if (image) {
          reader.readAsDataURL(image);
      }
  }
    getImageFromService(user : any) {
      this.isImageLoading = true;
      this.getImage(user).subscribe(
          (data) => {
              this.createImageFromBlob(data);
              this.isImageLoading = false;
          },
          (error) => {
              console.log(error);
          }
      );
  }
    getImage(user :any): Observable<Blob> {
      return this.http.get(
          
          "http://localhost:3000/uploads/image/"+user.imageUrl,
          { responseType: "blob" }
      );
  }
  ngOnInit() {     this.getConnected();
}

}
