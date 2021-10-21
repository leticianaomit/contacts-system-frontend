import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseContactDTO } from 'src/app/core/models/contact';
import { ContactsService } from 'src/app/core/services/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  idContact!: string;
  idPerson: string;
  contactForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.email],
    phone: [],
    whatsapp: [],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private contactData: ResponseContactDTO,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private contactsService: ContactsService,
  ) {
    this.idPerson = this.contactData?.idPerson;

    if (this.contactData?.id) {
      this.idContact = this.contactData.id;
      this.contactForm.patchValue(this.contactData);
    }
  }

  ngOnInit(): void {}

  submitForm() {
    const form = this.contactForm.value;

    const contact: ResponseContactDTO = form;
    contact.idPerson = this.idPerson;

    if (this.idContact) this.updateContact(contact);
    else this.saveContact(contact);

    this.dialog.closeAll();
  }

  refreshContactList() {
    this.contactsService.getContactList(this.idPerson);
  }

  private async updateContact(contact: ResponseContactDTO) {
    await this.contactsService.updateContact(this.idContact, contact);
    this.refreshContactList();
  }

  private async saveContact(contact: ResponseContactDTO) {
    await this.contactsService.saveContact(contact);
    this.refreshContactList();
  }
}
