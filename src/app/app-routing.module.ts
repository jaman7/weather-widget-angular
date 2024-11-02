import { NgModule } from '@angular/core';
import { RouterConfigOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

const routerOptions: RouterConfigOptions = {
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
