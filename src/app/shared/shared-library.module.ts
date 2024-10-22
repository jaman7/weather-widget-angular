import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ZorroAntdModule } from './ng-zorro-antd.module';

@NgModule({
  imports: [CommonModule, TranslateModule, ZorroAntdModule],
  exports: [CommonModule, TranslateModule, ZorroAntdModule],
})
export class SharedLibraryModule {}
