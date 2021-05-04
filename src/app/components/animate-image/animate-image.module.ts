import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateImageRoutingModule } from './animate-image-routing.module';
import { AnimateImageComponent } from './animate-image.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ShowAnimationComponent } from './show-animation/show-animation.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';

import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowMarkersComponent } from './show-markers/show-markers.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateMarkerComponent } from './create-marker/create-marker.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [AnimateImageComponent, ActionsMarkerComponent, ShowMarkersComponent, CreateProjectComponent, CreateMarkerComponent],
  imports: [
    CommonModule,
    AnimateImageRoutingModule,
    DropzoneModule,
    DragDropModule,
    RichTextEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[{ provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG},
    NgbActiveModal]
})
export class AnimateImageModule { }
