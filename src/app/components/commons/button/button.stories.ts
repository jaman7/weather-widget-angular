import { moduleMetadata, StoryObj, Meta } from '@storybook/angular';
import { fn } from '@storybook/test';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@app/shared';
import { ZorroAntdModule } from '@app/shared/ng-zorro-antd.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, LanguageService } from '@app/core';
import { EffectsModule } from '@ngrx/effects';
import { APP_INITIALIZER } from '@angular/core';
import { initializeLanguageService } from '@app/core/translate-core.module';
import { CommonModule } from '@angular/common';
import { ButtonsControl, MapButtonsIcons, MapButtonsTooltip } from '../map/components/btn-controls/btn-controls.enums';
import { ButtonComponent } from './button.component';

const initialState = {
  exampleFeature: {
    someProperty: 'someValue', // Przykład struktury stanu
  },
  language: {
    selectedLanguage: 'en', // Ustaw język na 'en'
  },
};

export default {
  title: 'Components/Buttons',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule, CoreModule, SharedModule, ZorroAntdModule, TranslateModule.forRoot(), EffectsModule.forRoot([])],
      providers: [
        provideMockStore({ initialState }),
        LanguageService,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLanguageService,
          deps: [LanguageService],
          multi: true,
        },
      ],
    }),
  ],
  argTypes: {
    name: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'text' },
    className: { control: 'text' },
    isRound: { control: 'boolean' },
    customClass: { control: 'text' },
    tooltipTitle: { control: 'text' },
  },
  args: { btnClick: fn(), btnClickId: fn() },
} as Meta<ButtonComponent>;

const { BTN_HOME } = ButtonsControl;
const { HOME_TOOLTIP, ZOOM_IN_TOOLTIP, ZOOM_OUT_TOOLTIP } = MapButtonsTooltip;
const { ICON_HOME, ICON_ZOOM_IN, ICON_ZOOM_OUT } = MapButtonsIcons;

type ButtonStory = StoryObj<ButtonComponent>;

export const Default: ButtonStory = {
  args: {
    isRound: false,
    name: BTN_HOME,
  },
};

export const Round1: ButtonStory = {
  args: {
    isRound: true,
    tooltipTitle: HOME_TOOLTIP,
    icon: ICON_HOME,
  },
};

export const Round2: ButtonStory = {
  args: {
    isRound: true,
    tooltipTitle: ZOOM_IN_TOOLTIP,
    icon: ICON_ZOOM_IN,
  },
};

export const Round3: ButtonStory = {
  args: {
    isRound: true,
    tooltipTitle: ZOOM_OUT_TOOLTIP,
    icon: ICON_ZOOM_OUT,
  },
};
