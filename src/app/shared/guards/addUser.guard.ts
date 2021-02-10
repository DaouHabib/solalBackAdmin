import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { CreateUserComponent } from '../../components/users/create-user/create-user.component';



@Injectable({ providedIn: 'root' })
export class AddUserGuardService implements CanDeactivate <CreateUserComponent>{
    canDeactivate(component: CreateUserComponent):boolean {
      
      return true;

}
}