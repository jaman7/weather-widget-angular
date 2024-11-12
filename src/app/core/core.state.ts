import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment as env } from '@env/environment';
import { debugReducer, initStateFromLocalStorage } from '@app/core/meta-reducers/init-state-storage.reducer';
import { routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { languageReducer } from './language/store';
import { LanguageType } from './language/language.models';

export interface AppState {
  language: LanguageType;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}

export const reducers: ActionReducerMap<AppState> = {
  language: languageReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

if (!env.production) metaReducers.unshift(debugReducer);

export const selectLanguageState = createFeatureSelector<LanguageType>('language');

export const selectRouterState = createFeatureSelector<RouterReducerState<SerializedRouterStateSnapshot>>('router');

export const APP_PREFIX = 'test-APP';
