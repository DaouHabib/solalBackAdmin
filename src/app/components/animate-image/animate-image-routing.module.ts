import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';
import { AnimateImageComponent } from './animate-image.component';
import { CreateMarkerComponent } from './create-marker/create-marker.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ShowAnimationComponent } from './show-animation/show-animation.component';
import { ShowMarkersComponent } from './show-markers/show-markers.component';

const routes: Routes = [
  {
    path: '',
    component: AnimateImageComponent
  },
  {
    path: 'newproject',
    component: CreateProjectComponent
  },
  {
    path: 'showMarkers/:idporject',
    component: ShowMarkersComponent
  },
  {
    path: 'createMarker/:idporject',
    component: CreateMarkerComponent
  },
  {
    path: 'actionMarker/:idMarker',
    component: ActionsMarkerComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimateImageRoutingModule { }
