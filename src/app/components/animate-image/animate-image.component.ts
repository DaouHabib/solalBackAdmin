import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs';
import { Projectservice } from '../../shared/service/newProjet.service';
import { Produitservice } from '../../shared/service/produit.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-animate-image',
  templateUrl: './animate-image.component.html',
  styleUrls: ['./animate-image.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]

})
export class AnimateImageComponent implements  OnInit {
  user:any;
  image: any = null;
  isImageLoading: boolean;
  ImageOpen: boolean;
  imageToShow: any;
  images = [];
constructor(private userservice:UserService, private projectservice : Projectservice ,private http: HttpClient, 
  private router: Router,
  public sanitization: DomSanitizer,
){}
  gridColumns = 3;
  projects:any =[];
  public  getConnected(){
    this.userservice.getuser().subscribe(data=>{
    this.user = data;
    console.log(data._id);
    this.projectservice.getProjetByiduser(data._id).subscribe(res=>{
      res.forEach(element => {
        this.getImageFromService(element);
      });
    })
  });
}
createImageFromBlob(image: Blob,projet:any) {
  var  imageToShow:any;
  let reader = new FileReader();
  reader.addEventListener(
      "load",
      () => {
        imageToShow = this.sanitization.bypassSecurityTrustResourceUrl(reader.result.toString());
          this.projects.push({
            id: projet._id,
            name: projet.name,
            imageUrl: imageToShow
            })
      },
      false
  );

  if (image) {
 reader.readAsDataURL(image);
  }
}
getImageFromService(projet : any):any {
  this.getImage(projet.imageUrl).subscribe(
      (data) => {
          this.createImageFromBlob(data,projet);
      },
      (error) => {
          console.log(error);
      }
  );
}
getImage(projet :any): Observable<Blob> {
  console.log(projet);
  return this.http.get(
      "https://solalireality.herokuapp.com/uploads/image/"+projet,
      { responseType: "blob" }
  );
}
goTomarker(id:any){
  this.router.navigate( ['/animate/showMarkers/'+id] );

}

 ngOnInit(){
   this.getConnected();
   console.log(this.projects);
 }
}
