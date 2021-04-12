import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimateImageComponent } from './animate-image.component';
import { ShowAnimationComponent } from './show-animation/show-animation.component';

const routes: Routes = [
  {
    path: '',
    component: AnimateImageComponent
  },
  {
    path: 'show',
    component: ShowAnimationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimateImageRoutingModule { }
