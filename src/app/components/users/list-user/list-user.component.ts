import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userListDB } from 'src/app/shared/tables/list-users';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []
  id= localStorage.getItem("connectedId");

  constructor( private userService: UserService,private router :Router) {
    this.getallcustumers();
  }

  public settings = {
    hideSubHeader: true,
    edit: { confirmSave: true } ,
    delete: { confirmDelete : true } ,
    actions: {
     
      custom: [{ name: 'ourCustomAction', title: '<i class="btn btn-secondary">>></i>' }],
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

getConnected(){
  
}
onCustomAction(event){
console.log(event.data._id);
this.router.navigate(["users/entreprise/"+event.data._id]);
}


  getallcustumers(): void {
    this.userService
        .getAll()
        .subscribe(
            (data) =>
                (this.user_list=(data))
        );
}
onEditConfirm(event){
  if (window.confirm('Are you sure you want to save?')) {
    console.log(event.newData);
    event.confirm.resolve(this.userService.edit(event.newData,event.data._id).subscribe(res=>{
      console.log (res);
      
      this.getallcustumers();
    }));
  } else {
    event.confirm.reject();
  }

}
onDeleteConfirm(event){
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve(  this.userService.delete(event.data._id).subscribe(res=>{
      console.log (res);
      this.getallcustumers();
    }));
  } else {
    event.confirm.reject();
  }
  console.log(event)

}

  ngOnInit() {
  }

}

