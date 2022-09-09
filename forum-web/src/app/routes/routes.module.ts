import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: []
})
export class RoutesModule { }
