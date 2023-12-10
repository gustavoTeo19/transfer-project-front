import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BackendReturn } from '../interfaces/transfer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly API = 'http://localhost:8080/transfer'

  constructor(private http: HttpClient) { }

  list(): Observable<BackendReturn>{
    const url = `${this.API}/list-transfer`
    return this.http.get<BackendReturn>(url)
  }

}
