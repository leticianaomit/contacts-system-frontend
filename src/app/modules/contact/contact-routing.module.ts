import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Contatos',
    },
    children: [
      {
        path: '',
        component: ContactListComponent,
        pathMatch: 'full',
        data: {
          ignoreBreadcrumb: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
