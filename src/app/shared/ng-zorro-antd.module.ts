import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  AccountBookFill,
  AlertOutline,
  AlertFill,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';

const icons: IconDefinition[] = [StepBackwardOutline, CaretLeftOutline, SettingOutline, AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  exports: [NzButtonModule, NzIconModule, NzToolTipModule, NzCheckboxModule, NzRadioModule, ScrollingModule],
  imports: [NzIconModule.forChild(icons)],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class ZorroAntdModule {}
