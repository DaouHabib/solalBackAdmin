import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertImageRoutingModule } from './convert-image-routing.module';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { ConvertImageComponent } from './convert-image.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [ConvertImageComponent],
  imports: [
    CommonModule,
    ConvertImageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    DropzoneModule
  ],
  providers:[{ provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG},
    NgbActiveModal]
})
export class ConvertImageModule { }
