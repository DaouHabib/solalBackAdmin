import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  user : any;
  constructor(private userservice : UserService,
    private router: Router,) {this.forgotPasswordForm = new FormGroup(
      {
        Retypepassword: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),

      }) }

  ngOnInit(): void {
    this.getConnected();

  }
  public  getConnected(){
    this.userservice.getuser().subscribe(data=>{
    this.user = data;
    console.log(data);
  });
}

public ResetPassword(){
  if(this.forgotPasswordForm.value.password ==this.forgotPasswordForm.value.Retypepassword){
    console.log("True");
  
  const UserT = this.user;
  
  UserT.password =this.forgotPasswordForm.value.password  ;
  console.log(UserT);
    this.userservice.edit(UserT, this.user._id).subscribe(
      user => {
        console.log(user);
          this.router.navigate( ['/authentication/login'] );
  
      },
      err => {console.log(err);
      }
  );
  }
  else {console.log("erreur");
  }
  console.log(this.user);
  
    
   }
}
