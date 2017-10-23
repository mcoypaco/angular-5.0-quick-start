import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ForbiddenPageComponent } from './core/forbidden-page/forbidden-page.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/layout/layout.module#LayoutModule',
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
