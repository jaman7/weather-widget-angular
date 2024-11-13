import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from './core.state';
import { HttpClientModule } from './http/httpclient.module';
import { TranslateCoreModule } from './translate-core.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    TranslateCoreModule,
  ],
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
