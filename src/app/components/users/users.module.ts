import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ListEntrepriseComponent } from './list-entreprise/list-entreprise.component';
import { CreateEntrepriseComponent } from './create-entreprise/create-entreprise.component';
import { UsersEntrepriseComponent } from './users-entreprise/users-entreprise/users-entreprise.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ListUsersEntrepriseComponent } from './listUsersEntreprise/list-users-entreprise/list-users-entreprise.component';
import { AddUsersEntrepriseComponent } from './listUsersEntreprise/addUsersEntreprise/add-users-entreprise/add-users-entreprise.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, ListEntrepriseComponent, CreateEntrepriseComponent,UsersEntrepriseComponent, ListUsersEntrepriseComponent, AddUsersEntrepriseComponent],
  imports: [
    DropzoneModule,
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule
  ]
  ,
  providers:[{ provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG},
    NgbActiveModal]
})
export class UsersModule { }
