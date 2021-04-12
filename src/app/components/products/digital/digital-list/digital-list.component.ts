import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { digitalListDB } from 'src/app/shared/tables/digital-list';
import { Produitservice } from '../../../../shared/service/produit.service';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit  {
  public digital_list = []
  image: any = null;
  isImageLoading: boolean;
  ImageOpen: boolean;
  user : any;
  imageToShow: any;
  images = [];
  constructor(private productService:Produitservice,private http: HttpClient,
    public sanitization: DomSanitizer) {


  }
 
  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      title: {
        title: 'title',
      },
  
      prix: {
        title: 'Prix'
      },
      stock: {
        title: 'Stock',
      },
  
    },
  };
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
          this.imageToShow = this.sanitization.bypassSecurityTrustResourceUrl(
                reader.result.toString()
            );
            console.log(this.imageToShow);
            this.images=this.imageToShow;
        },
        false
    );

    if (image) {
   reader.readAsDataURL(image);
    }
}
  getImageFromService(produit : any):any {
    this.isImageLoading = true;
    console.log(produit);
    this.getImage(produit.imageUrl).subscribe(
        (data) => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
        },
        (error) => {
            console.log(error);
        }
    );
}
  getImage(produit :any): Observable<Blob> {
    console.log(produit);
    return this.http.get(
        
        "http://localhost:3000/uploads/image/"+produit,
        { responseType: "blob" }
    );
}
  ngOnInit() { this.productService.getAll().subscribe(res=>{
    this.digital_list=res;
    res.forEach(element => {
  this.getImageFromService(element);
  });
  })
  }

}
