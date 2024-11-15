import { withActions } from '@storybook/addon-actions/decorator';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZorroAntdModule } from '@app/shared/ng-zorro-antd.module';
import docJson from '../documentation.json';
setCompodocJson(docJson);

export const decorators = [
  moduleMetadata({
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, TranslateModule.forRoot(), ZorroAntdModule],
  }),
  withActions,
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
