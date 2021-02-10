import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService, Menu } from '../../service/nav.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  user: any;
  isEntreprise=false;
  isAdmin=false;
  isUser =false;
  image: any = null;
  isImageLoading: boolean;
  isEmployee = false;
  imageExist:boolean;
  id= localStorage.getItem("connectedId");
  constructor(private router: Router, public navServices: NavService,  private _router: Router,
    private _serviceUser : UserService,
    private http: HttpClient,
    public sanitization: DomSanitizer,) {


      
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems)
              })
            })
          })
        }
      })
    })
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }
  public  getConnected(){
   
    this._serviceUser.getuserByid(this.id).subscribe(data=>{
     this.user = data;
     console.log(data);
     if(data.Role =="ADMIN"){
         this.isAdmin=true
     }
     if(data.Role =="USER"){
         this.isUser=true
     }
     if(data.Role =="EMPLOYEE"){
         this.isEmployee=true
     }
     if(data.Role =="ENTREPRISE"){
         this.isEntreprise=true;
     }
     this.getImageFromService(data);

  });
 
 }
 
 imageToShow: any;

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
ngOnInit(){
  this.getConnected();
}

}
