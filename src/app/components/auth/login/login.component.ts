import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/service/authentication.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder ,  private authService: AuthenticationService,
    private router: Router,
    private userService: UserService) {
    this.createLoginForm();
    this.createRegisterForm();
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
  });
    
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
        (data) => {
            this.authService.saveToken(data.token);
            if (data){
                this.router.navigate( ['dashboard/default'] );
              }
            
        },
        (error) => {
        }
    );
}
  owlcarousel = [
    {
      title: "Welcome to Ireality Application",
      desc: "Pour une meilleur expérience utilisateur Pour l'animation des images  utiliser notre Application Ireality .",
    },
    {
      title: "Welcome to Ireality Application",
      desc: "Pour une meilleur expérience utilisateur Pour l'animation des images  utiliser notre Application Ireality .",
    },
    {
      title: "Welcome to Ireality Application",
      desc: "Pour une meilleur expérience utilisateur Pour l'animation des images  utiliser notre Application Ireality .",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    
  }

}
