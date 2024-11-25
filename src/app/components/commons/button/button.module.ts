import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZorroAntdModule } from '@app/shared/ng-zorro-antd.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, TranslateModule, ZorroAntdModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
