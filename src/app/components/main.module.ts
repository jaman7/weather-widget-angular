import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderModule } from './header/header.module';
import { NotFoundModule } from './content/not-found/not-found.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule, NgOptimizedImage, MainRoutingModule, NotFoundModule, HeaderModule],
  providers: [],
})
export class MainModule {}
