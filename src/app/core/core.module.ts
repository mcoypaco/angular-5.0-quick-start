import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiService } from './api.service';
import { SortingService } from './sorting.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [PageNotFoundComponent],
  providers: [ApiService, SortingService]
})
export class CoreModule { }
