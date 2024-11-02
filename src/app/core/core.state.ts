import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment as env } from '@env/environment';
import { Language } from '@app/shared/enums/language';
import { debugReducer, initStateFromLocalStorage } from '@app/core/meta-reducers/init-state-storage.reducer';
import { routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { languageReducer } from './language/store';

export interface AppState {
  language: Language;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}

export const reducers: ActionReducerMap<AppState> = {
  language: languageReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

if (!env.production) {
  metaReducers.unshift(debugReducer);
}

export const selectLanguageState = createFeatureSelector<Language>('language');

export const selectRouterState = createFeatureSelector<RouterReducerState<SerializedRouterStateSnapshot>>('router');

export const APP_PREFIX = 'test-APP';
