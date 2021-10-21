import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'persons', pathMatch: 'full' },
      {
        path: 'persons',
        loadChildren: () =>
          import('./modules/persons/persons.module').then(
            (m) => m.PersonsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
