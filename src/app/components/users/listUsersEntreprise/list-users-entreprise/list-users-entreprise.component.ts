import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/service/user.service';

@Component({
  selector: 'app-list-users-entreprise',
  templateUrl: './list-users-entreprise.component.html',
  styleUrls: ['./list-users-entreprise.component.scss']
})
export class ListUsersEntrepriseComponent implements OnInit {

  public user_list = []
  id= localStorage.getItem("connectedId");
  iduser:any;
  constructor( private userService: UserService,private router :Router,private route: ActivatedRoute,) {
    this.getEntrepriseEmployee();
  }

  public settings = {
    hideSubHeader: true,
    edit: { confirmSave: true } ,
    delete: { confirmDelete : true } ,
    actions: {
     
      position: 'right'
    },
    columns: {
   
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'phone'
      },
      civility: {
        title: 'civility'
      },
      socialReason
      : {
        title: 'socialReason'
      },
    
    },
   

  };


getEntrepriseEmployee(): void {
  this.route.paramMap.subscribe((routes:any)=>{
    this.iduser=routes.params.id;
  this.userService
      .getEmployees(routes.params.id)
      .subscribe(
          (data) =>
          (this.user_list=(data))

      );
  })
}
adduser(){
this.router.navigate(["/users/entreprises/addEmployee/"+this.iduser]);
}
onEditConfirm(event){
  if (window.confirm('Are you sure you want to save?')) {

    event.confirm.resolve(this.userService.edit(event.newData,event.data._id).subscribe(res=>{
      console.log (res);
      this.getEntrepriseEmployee();
    }));
  } else {
    event.confirm.reject();
  }

}
onDeleteConfirm(event){
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve(  this.userService.delete(event.data._id).subscribe(res=>{
      console.log (res);
      this.getEntrepriseEmployee();
    }));
  } else {
    event.confirm.reject();
  }
  console.log(event)

}

  ngOnInit() {
  }

}
