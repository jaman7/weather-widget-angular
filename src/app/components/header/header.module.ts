import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
