import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const COMPONENT = [NotFoundComponent];

@NgModule({
  declarations: [...COMPONENT],
  imports: [BrowserModule, RouterModule.forChild([{ path: '**', component: NotFoundComponent }])],
  exports: [RouterModule],
})
export class NotFoundModule {}
