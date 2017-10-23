import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthModule } from '../auth/auth.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    AuthModule,
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
