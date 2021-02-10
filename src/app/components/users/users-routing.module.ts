import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListEntrepriseComponent } from './list-entreprise/list-entreprise.component';
import { CreateEntrepriseComponent } from './create-entreprise/create-entreprise.component';
import { UsersEntrepriseComponent } from './users-entreprise/users-entreprise/users-entreprise.component';
import { ListUsersEntrepriseComponent } from './listUsersEntreprise/list-users-entreprise/list-users-entreprise.component';
import { AddUsersEntrepriseComponent } from './listUsersEntreprise/addUsersEntreprise/add-users-entreprise/add-users-entreprise.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-user',
        component: ListUserComponent,
        data: {
          title: "User List",
          breadcrumb: "User List"
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: "Create User",
          breadcrumb: "Create User"
        }
      },
      {
        path : "entreprise/:id" , 
        component : ListEntrepriseComponent
      },
      {
        path : "createentreprise/:id" , 
        component : CreateEntrepriseComponent
      },
      {
        path : "createentreprise/:id" , 
        component : CreateEntrepriseComponent
      },
      {
        path : "entreprises" , 
        component : UsersEntrepriseComponent
      },
      {
        path: 'entreprises/Employee/:id',
        component: ListUsersEntrepriseComponent
      },
      {
        path: 'entreprises/addEmployee/:id',
        component: AddUsersEntrepriseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
