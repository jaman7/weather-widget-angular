import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Definicja FakeLoader
export class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Możesz tu zwrócić podstawowy obiekt tłumaczeń lub pusty obiekt
    return of({
      BTN_HOME: 'Home',
      ZOOM_IN_TOOLTIP: 'Zoom In',
      ZOOM_OUT_TOOLTIP: 'Zoom Out',
      // Dodaj dowolne inne klucze tłumaczeń, których używają twoje komponenty
    });
  }
}
