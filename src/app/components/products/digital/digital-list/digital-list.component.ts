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
    hideSubHeader: true,
    edit: { confirmSave: true } ,
    delete: { confirmDelete : true } ,
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
        
        "https://solalireality.herokuapp.com/uploads/image/"+produit,
        { responseType: "blob" }
    );
}
getAllproducts(){
  this.productService.getAll().subscribe(res=>{
    this.digital_list=res;

  })
}
onEditConfirm(event){
  if (window.confirm('Are you sure you want to save?')) {
    console.log(event.newData);
    event.confirm.resolve(this.productService.edit(event.newData,event.data._id).subscribe(res=>{
      console.log (res);
      
      this.getAllproducts();
    }));
  } else {
    event.confirm.reject();
  }

}
onDeleteConfirm(event){
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve(  this.productService.delete(event.data._id).subscribe(res=>{
      console.log (res);
      this.getAllproducts();
    }));
  } else {
    event.confirm.reject();
  }
  console.log(event)

}

  ngOnInit() { 
    this.getAllproducts();
  }

}
