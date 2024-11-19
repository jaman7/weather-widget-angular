import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { safelyParseJSON, toCamelCase } from '@app/shared/utils/utils';
import { APP_PREFIX, AppState } from '../core.state';
import { AbstractStorageService, SessionStorageService } from '@app/shared/utils/abstract-storage.service';

const storageService: AbstractStorageService = new SessionStorageService();

export function getStateKeys(storageKey: string): string[] {
  return storageKey?.replace(APP_PREFIX, '')?.toLowerCase()?.split('.')?.map(toCamelCase) ?? [];
}

function updateNestedState(state: any, keys: string[], value: any): any {
  return keys.reduceRight((acc, key, index) => {
    if (index === keys.length - 1) return { ...state, [key]: value };
    return { ...state, [key]: { ...state[key], ...acc } };
  }, {});
}

export function loadInitialState(): Record<string, any> {
  return Object.keys(sessionStorage).reduce((state: any, storageKey: string) => {
    if (!storageKey.startsWith(APP_PREFIX)) return state;

    const storedItem = storageService.getItem(storageKey);
    if (!storedItem) return state;

    const parsedItem = safelyParseJSON(storedItem);
    if (parsedItem === null) return state;

    const stateKeys = getStateKeys(storageKey);
    return updateNestedState(state, stateKeys, parsedItem);
  }, {});
}

export function initStateFromLocalStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);

    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      const loadedState = loadInitialState();
      return { ...newState, ...loadedState };
    }

    return newState;
  };
}

export function debugReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => reducer(state, action);
}
