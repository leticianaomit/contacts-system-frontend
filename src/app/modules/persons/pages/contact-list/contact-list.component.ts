import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/app/shared/models/table';
import { ResponseContactDTO } from 'src/app/core/models/contact';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  pageSizeOptions = [10, 20, 50, 100];
  idPerson: string;

  dialogSubscription!: Subscription;
  contactListSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.idPerson = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy() {
    this.contactListSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadContacts() {
    this.contactsService.getContactList(this.idPerson);
    this.contactListSubscription = this.contactsService.contactList$.subscribe(
      (data) => {
        this.dataSource.data = data;
      }
    );
  }

  onClickBtnAddContact() {
    this.dialog.open(ContactFormComponent, {
      data: { idPerson: this.idPerson },
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
    contact.idPerson = this.idPerson
    this.dialog.open(ContactFormComponent, {
      data: contact,
      width: '600px',
      autoFocus: false,
    });
  }

  async deleteContact(id: string) {
    await this.contactsService.deleteContact(id);
    this.contactsService.getContactList(this.idPerson);
    this.dialog.closeAll();
  }
}
