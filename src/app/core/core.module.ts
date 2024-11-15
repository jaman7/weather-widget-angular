import { CommonModule } from '@angular/common';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from './http/httpclient.module';
import { TranslateCoreModule } from './translate-core.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateCoreModule],
  declarations: [],
  providers: [],
  exports: [HttpClientModule],
})
export class CoreModule {
  constructor(
    private injector: Injector,
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
