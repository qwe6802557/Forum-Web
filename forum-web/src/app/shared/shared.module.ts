import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//导入antd依赖模块
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
// 自有模块导入


@NgModule({
  declarations: [
    // 公共组件
  ],
  imports: [
    CommonModule,
    ...SHARED_ZORRO_MODULES
  ],
  exports: [CommonModule, ...SHARED_ZORRO_MODULES]
})
export class SharedModule { }
