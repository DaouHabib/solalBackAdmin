import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../shared/service/user.service';

@Component({
  selector: 'app-add-users-entreprise',
  templateUrl: './add-users-entreprise.component.html',
  styleUrls: ['./add-users-entreprise.component.scss']
})
export class AddUsersEntrepriseComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  selectedFile: File = null;
  id_user:any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router : Router,private route : ActivatedRoute) {
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
    this.route.paramMap.subscribe((routes:any)=>{
      this.userService.AddEmployee(this.accountForm.value,routes.params.id).subscribe(
          user => {
              console.log(user);
             
                this.router.navigate(["/users/entreprises/Employee/"+routes.params.id]);
           
          },
          error => {
            console.log(error);
          }
      );
  })
}

  ngOnInit() {
  }

}
