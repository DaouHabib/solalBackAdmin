import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateImageRoutingModule } from './animate-image-routing.module';
import { AnimateImageComponent } from './animate-image.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ShowAnimationComponent } from './show-animation/show-animation.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [AnimateImageComponent, ShowAnimationComponent],
  imports: [
    CommonModule,
    AnimateImageRoutingModule,
    DropzoneModule,
    DragDropModule
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[{ provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG},
    NgbActiveModal]
})
export class AnimateImageModule { }
