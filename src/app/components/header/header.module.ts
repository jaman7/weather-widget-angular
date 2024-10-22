import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
