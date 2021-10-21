import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsePersonDTO } from '../models/person';
import { PersonsApiService } from '../http/persons-api.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  private personList = new BehaviorSubject<ResponsePersonDTO[]>([]);
  personList$ = this.personList.asObservable();

  constructor(
    private personsApiService: PersonsApiService,
    private snackbarService: SnackbarService
  ) {}

  setPersonList(data: ResponsePersonDTO[]) {
    this.personList.next(data);
  }

  getPersonList() {
    this.personsApiService.getAll().subscribe(
      (data) => {
        this.setPersonList(data);
      },
      (_err) => {
        this.snackbarService.showFailureSnackbar(
          `Não foi possível buscar os registros!`,
          'Tente novamente'
        );
      }
    );
  }

  savePerson(person: ResponsePersonDTO): Promise<void> {
    return new Promise((resolve) => {
      this.personsApiService
        .create(person)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Registro salvo com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível salvar este registro!`,
              'Tente novamente'
            );
          },
          () => {
            resolve();
          }
        );
    });
  }

  updatePerson(
    id: ResponsePersonDTO['id'],
    person: ResponsePersonDTO
  ): Promise<void> {
    return new Promise((resolve) => {
      this.personsApiService
        .update(id, person)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Registro atualizado com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível atualizar este registro!`,
              'Tente novamente'
            );
          },
          () => {
            console.log(123);
            resolve();
          }
        );
    });
  }

  deletePerson(id: ResponsePersonDTO['id']): Promise<void> {
    return new Promise((resolve) => {
      this.personsApiService
        .delete(id)
        .pipe(take(1))
        .subscribe(
          () => {
            this.snackbarService.showSuccessSnackbar(
              `Registro removido com sucesso!`,
              'OK'
            );
          },
          (_err) => {
            this.snackbarService.showFailureSnackbar(
              `Não foi possível remover este registro!`,
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
