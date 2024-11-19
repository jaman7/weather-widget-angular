import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../core.state';
import { Router, Routes } from '@angular/router';
import { TranslateResolver } from './translate.resolver';
import { Component } from '@angular/core';
import { provideRouterTesting } from '@angular/router/testing';

@Component({ template: '<div>Test Component</div>' })
class TestComponent {}

describe('LanguageService with Routing', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockTranslations = {
    en: { greeting: 'Hello' },
    pl: { greeting: 'Cześć' },
  };

  const routes: Routes = [
    {
      path: 'test',
      component: TestComponent,
      resolve: {
        translations: TranslateResolver,
      },
      data: {
        i18Local: ['menu', 'home'],
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideRouterTesting(routes), TranslateService, LanguageService, TranslateResolver],
      imports: [StoreModule.forRoot(reducers)],
      declarations: [TestComponent],
    });

    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    spyOn(service, 'loadTranslations').and.returnValue(Promise.resolve(true));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should resolve translations for a route', async () => {
    router.navigate(['/test']).then(() => {
      expect(service.loadTranslations).toHaveBeenCalledWith(['menu', 'home']);
    });
  });

  it('should handle missing translation files for a route gracefully', async () => {
    service.loadTranslations.and.callThrough();

    router.navigate(['/test']).then(() => {
      const req1 = httpMock.expectOne('assets/i18Local/en/menu.json?v=' + new Date().getTime());
      req1.error(new ErrorEvent('404 Not Found'));

      const req2 = httpMock.expectOne('assets/i18Local/en/home.json?v=' + new Date().getTime());
      req2.flush(mockTranslations.en);

      expect(service.loadTranslations).toHaveBeenCalledWith(['menu', 'home']);
      expect(service.loadTranslations).not.toThrow();
    });
  });
});
