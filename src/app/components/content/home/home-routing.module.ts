import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateResolver } from '@app/core';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    data: {
      i18Local: 'home',
    },
    component: HomeComponent,
    resolve: {
      translate: TranslateResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
