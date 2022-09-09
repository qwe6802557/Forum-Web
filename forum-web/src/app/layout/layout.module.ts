import { NgModule } from '@angular/core';
import { SharedModule } from "@shared";

import { PageComponent } from './page/page.component';
import { HeaderComponent } from './page/header/header.component';
import { SidebarComponent } from './page/sidebar/sidebar.component';
import { RouterModule } from "@angular/router";

const COMPONENTS = [PageComponent, HeaderComponent, SidebarComponent]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
