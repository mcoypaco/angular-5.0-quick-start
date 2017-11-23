import { NgModule } from '@angular/core';
import { MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { AuthModule } from '../auth/auth.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
  imports: [
    AuthModule,
    LayoutRoutingModule,
    MatMenuModule,
    MatSidenavModule, 
    MatToolbarModule,
    SharedModule,
  ],
  declarations: [LayoutComponent, SidenavComponent, ToolbarComponent],
  providers: [SidenavService]
})
export class LayoutModule { }
