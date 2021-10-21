import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PersonsRoutingModule } from './persons-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { PersonsService } from 'src/app/core/services/persons.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PersonListComponent,
    ContactListComponent,
    ContactFormComponent,
    PersonFormComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    PersonsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [ContactsService, PersonsService]
})
export class PersonsModule {}
