import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { PersonListComponent } from './pages/person-list/person-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/contacts',
    component: ContactListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
