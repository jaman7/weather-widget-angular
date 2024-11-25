import { DirectivesModule } from './directives/directives.module';
import { SharedLibraryModule } from './shared-library.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [SharedLibraryModule, DirectivesModule],
  exports: [SharedLibraryModule, DirectivesModule],
})
export class SharedModule {}
