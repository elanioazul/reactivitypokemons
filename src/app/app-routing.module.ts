import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { FrameComponent } from './components/frame/frame.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'frame',
    component: FrameComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      anchorScrolling: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
