import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordFormComponent } from './forget-password-form/forget-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path: "forgotPassword/:token",
    component: ForgetPasswordComponent
  },
  {
    path: "forgotPassword",
    component: ForgetPasswordFormComponent
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
