import { ZorroAntdModule } from '@app/shared/ng-zorro-antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, TranslateModule, ZorroAntdModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
