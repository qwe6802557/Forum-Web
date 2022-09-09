import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from "./page/page.component";

const routes: Routes = [
  {
  path: "", redirectTo: "social", pathMatch: "full"
  },
  {
    path: "social", component: PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
