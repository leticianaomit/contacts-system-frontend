import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePersonDTO } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonsApiService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ResponsePersonDTO[]> {
    return this.http.get<ResponsePersonDTO[]>(`persons`);
  }

  create(contact: ResponsePersonDTO): Observable<any> {
    return this.http.post(`persons`, contact);
  }

  update(
    id: ResponsePersonDTO['id'],
    contact: ResponsePersonDTO
  ): Observable<any> {
    return this.http.patch(`persons/${id}`, contact);
  }

  delete(id: ResponsePersonDTO['id']): Observable<any> {
    return this.http.delete(`persons/${id}`);
  }
}
