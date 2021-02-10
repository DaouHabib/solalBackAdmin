import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NavService } from '../../service/nav.service';
import { UserService } from '../../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  user: any;
  image: any = null;
  isImageLoading: boolean;
  isEmployee = false;
  imageExist:boolean;
  id= localStorage.getItem("connectedId");
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private _serviceUser : UserService,
    private http: HttpClient,
    private cookieService: CookieService,
    private route : Router,
    public sanitization: DomSanitizer,) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public  getConnected(){
   
    this._serviceUser.getuserByid(this.id).subscribe(data=>{
     this.user = data;
     console.log(data);
     
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
  logout(){
  localStorage.removeItem("connectedId");
  this.cookieService.delete(null, "/");
this.route.navigate(['/auth/login']);
 }

}
