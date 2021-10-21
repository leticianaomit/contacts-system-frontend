import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/app/core/models/common/table';
import { ResponseContactDTO } from 'src/app/core/models/contact';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  tableColumns: TableColumn<ResponseContactDTO>[] = [
    {
      label: 'Nome',
      property: 'name',
      type: 'text',
    },
    {
      label: 'E-mail',
      property: 'email',
      type: 'text',
    },
    {
      label: 'Telefone',
      property: 'phone',
      type: 'text',
    },
    {
      label: 'Whatsapp',
      property: 'whatsapp',
      type: 'text',
    },
    {
      property: 'id',
      type: 'actions',
    },
  ];
  displayedColumns: string[] = ['name', 'email', 'phone', 'whatsapp', 'id'];
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  pageIndex = 0;
  sortBy = '';

  dialogSubscription!: Subscription;

  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getAll().subscribe((contacts) => {
      this.dataSource.data = contacts;
    });
  }

  onClickBtnAddContact() {
    this.dialog.open(ContactFormComponent, {
      width: '600px',
      autoFocus: false,
    });
  }

  onClickBtnDeleteContact(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      autoFocus: false,
    });

    this.dialogSubscription?.unsubscribe();
    this.dialogSubscription =
      dialogRef.componentInstance.whenConfirmDelete.subscribe(() => {
        this.deleteContact(id);
      });
  }

  onClickBtnEditContact(contact: ResponseContactDTO) {
    this.dialog.open(ContactFormComponent, {
      data: contact,
      width: '600px',
      autoFocus: false,
    });
  }

  deleteContact(id: string) {
    this.contactsService
      .delete(id)
      .pipe(take(1))
      .subscribe(
        () => {
          console.log('ok');
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.dialog.closeAll();
        }
      );
  }
}
