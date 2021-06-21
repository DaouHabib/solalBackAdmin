import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Projectservice } from '../../../shared/service/newProjet.service';

@Component({
  selector: 'app-show-markers',
  templateUrl: './show-markers.component.html',
  styleUrls: ['./show-markers.component.scss']
})
export class ShowMarkersComponent implements OnInit {
markers:any =[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projetService : Projectservice,
    private http: HttpClient, 
    public sanitization: DomSanitizer
  ) { }

  getProjects(){
    this.route.paramMap.subscribe((routes:any)=>{
      console.log(routes.params.idporject)
   this.projetService.getmarkerbyProjetByid(routes.params.idporject).subscribe(res=>{
     console.log(res);
   res.forEach(element => {
    this.getImageFromService(element);
   });
   })
      })  }

addMarker(){
  this.route.paramMap.subscribe((routes:any)=>{
    this.router.navigate( ['/animate/createMarker/'+routes.params.idporject] );
        
    })
}
showAnnimation(id:any){
  this.router.navigate( ['/animate/actionMarker/'+id]);
}

createImageFromBlob(image: Blob,marker:any) {
  var  imageToShow:any;
  let reader = new FileReader();
  reader.addEventListener(
      "load",
      () => {
        imageToShow = this.sanitization.bypassSecurityTrustResourceUrl(reader.result.toString());
          this.markers.push({
            id: marker._id,
            name: marker.markerName,
            imageUrl: imageToShow
            })
      },
      false
  );

  if (image) {
 reader.readAsDataURL(image);
  }
}
getImageFromService(marker : any):any {
  this.getImage(marker.imageUrl).subscribe(
      (data) => {
          this.createImageFromBlob(data,marker);
      },
      (error) => {
          console.log(error);
      }
  );
}
getImage(marker :any): Observable<Blob> {
  console.log(marker);
  return this.http.get(
      "https://solalireality.herokuapp.com/uploads/image/"+marker,
      { responseType: "blob" }
  );
}
  gridColumns = 3;
  ngOnInit(): void {
    this.getProjects();
  }

}
