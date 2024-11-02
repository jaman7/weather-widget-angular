import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_INITIALIZER, Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from './core.state';
import { LanguageEffects } from './language/store';
import * as build from '../../environments/build.json';
import { MissingTranslation } from './language/missing-translation.handler';
import { LanguageService } from './language/language.service';
import { HttpClientModule } from './http/httpclient.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  const buildJSON = build;
  return new TranslateHttpLoader(http, 'assets/i18Local/', `.json?v=${new Date(buildJSON.timestamp).getTime()}`);
}

export function initializeLanguageService(languageService: LanguageService) {
  return (): void => {
    languageService.init();
  };
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([LanguageEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslation },
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [],
  providers: [
    LanguageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLanguageService,
      deps: [LanguageService],
      multi: true,
    },
  ],
  exports: [TranslateModule, HttpClientModule],
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
