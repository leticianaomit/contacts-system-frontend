import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseContactDTO } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ResponseContactDTO[]> {
    return this.http.get<ResponseContactDTO[]>(`contacts`);
  }

  create(contact: ResponseContactDTO): Observable<any> {
    return this.http.post(`contacts`, contact);
  }

  update(
    id: ResponseContactDTO['id'],
    contact: ResponseContactDTO
  ): Observable<any> {
    return this.http.put(`contacts/${id}`, contact);
  }

  delete(id: ResponseContactDTO['id']): Observable<any> {
    return this.http.delete(`contacts/${id}`);
  }
}
