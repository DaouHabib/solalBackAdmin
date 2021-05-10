import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/service/authentication.service';
import { ToastService } from '../../../shared/service/toast.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordFormComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(  private userservice: UserService,
    private router: Router,
    private authService: AuthenticationService,
) {
  this.forgotPasswordForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    })
  
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
  ngOnInit(): void {
    localStorage.setItem('connectedId', null);
    this.authService.saveToken(null);

  }
  sendEmail() {
    console.log(this.forgotPasswordForm.value.email);

    this.userservice.sendEmail(this.forgotPasswordForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/auth/login']);
      console.log(res);
    },
      err => {
        this.forgotPasswordForm.reset();
      }

    );
  }

}
