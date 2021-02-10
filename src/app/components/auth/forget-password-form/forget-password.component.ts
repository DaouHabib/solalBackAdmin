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
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Solal Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
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
