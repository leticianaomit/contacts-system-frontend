import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseContactDTO } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsApiService {
  constructor(private readonly http: HttpClient) {}

  getAll(
    idPerson: ResponseContactDTO['idPerson']
  ): Observable<ResponseContactDTO[]> {
    return this.http.get<ResponseContactDTO[]>(`contacts`, {
      params: { idPerson },
    });
  }

  create(contact: ResponseContactDTO): Observable<any> {
    return this.http.post(`contacts`, contact);
  }

  update(
    id: ResponseContactDTO['id'],
    contact: ResponseContactDTO
  ): Observable<any> {
    return this.http.patch(`contacts/${id}`, contact);
  }

  delete(id: ResponseContactDTO['id']): Observable<any> {
    return this.http.delete(`contacts/${id}`);
  }
}
