import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APP_PREFIX } from '@app/core/core.state';
import { ActionLanguageChange, LanguageActionTypes } from './language.actions';

@Injectable()
export class LanguageEffects {
  constructor(private actions$: Actions<ActionLanguageChange>) {}

  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActionTypes.CHANGE_LANGUAGE),
        map((action) => {
          localStorage.setItem(`${APP_PREFIX}${'LANGUAGE'}`, JSON.stringify(action.payload));
        })
      ),
    { dispatch: false }
  );
}
