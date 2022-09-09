import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./page/page.component";

const routes: Routes = [{
  path: "", redirectTo: "home", pathMatch: "full"
}, {
  path: "home", component: HomePageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
