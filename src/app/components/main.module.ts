import { NotFoundModule } from './content/not-found/not-found.module';
import { HeaderModule } from './header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule, NgOptimizedImage, MainRoutingModule, NotFoundModule, HeaderModule],
  providers: [],
})
export class MainModule {}
