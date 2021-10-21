import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseContactDTO } from '../models/contact';
import { ContactsApiService } from '../http/contacts-api.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactList = new BehaviorSubject<ResponseContactDTO[]>([]);
  contactList$ = this.contactList.asObservable();

  constructor(
    private contactsApiService: ContactsApiService,
    private snackbarService: SnackbarService
  ) {}

  setContactList(data: ResponseContactDTO[]) {
    this.contactList.next(data);
  }

  getContactList(idPerson: ResponseContactDTO['idPerson']) {
    this.contactsApiService.getAll(idPerson).subscribe(
      (data) => {
        this.setContactList(data);
      },
      (_err) => {
        this.snackbarService.showFailureSnackbar(
          `Não foi possível buscar os contatos!`,
          'Tente novamente'
        );
      }
    );
  }

  saveContact(contact: ResponseContactDTO): Promise<void> {
    return new Promise((resolve) => {
      this.contactsApiService
        .create(contact)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Contato salvo com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível salvar este contato!`,
              'Tente novamente'
            );
          },
          () => {
            resolve();
          }
        );
    });
  }

  updateContact(
    id: ResponseContactDTO['id'],
    contact: ResponseContactDTO
  ): Promise<void> {
    return new Promise((resolve) => {
      this.contactsApiService
        .update(id, contact)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Contato atualizado com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível atualizar este contato!`,
              'Tente novamente'
            );
          },
          () => {
            resolve();
          }
        );
    });
  }

  deleteContact(id: ResponseContactDTO['id']): Promise<void> {
    return new Promise((resolve) => {
      this.contactsApiService
        .delete(id)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Contato removido com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível remover este contato!`,
              'Tente novamente'
            );
          },
          () => {
            resolve();
          }
        );
    });
  }
}
