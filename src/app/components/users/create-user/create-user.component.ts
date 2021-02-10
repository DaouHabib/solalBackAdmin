import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  selectedFile: File = null;
  id_user:any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private route : Router) {
    this.createAccountForm();
    this.createPermissionForm();
  }

 
  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstName: new FormControl(  "" , Validators.required ),
      lastName: new FormControl( "" , Validators.required),
      email: new FormControl( ""  ,  Validators.required),
      password: new FormControl("",  Validators.required),
      phone: new FormControl(0,  Validators.required),
      civility: new FormControl( ""),
      post: new FormControl( ""  ),
      socialReason: new FormControl( "" ),
      Role: new FormControl(""),
  }
    )
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  adduser(): void {
    console.log(this.accountForm.value)
    this.userService.Adduser(this.accountForm.value).subscribe(
      user => {
          console.log(user)
          this.route.navigate(['/users/list-user'])
      },
      error => {
        console.log("Erreur")
      }
  );
}

  ngOnInit() {
    this.userService.getuser().subscribe(res=>{
      console.log(res);
    })
  }

}
