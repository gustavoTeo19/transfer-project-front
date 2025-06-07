import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BackendReturn, Transfer } from '../interfaces/transfer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly API = 'http://localhost:8080/transfer/api/v1'

  constructor(private http: HttpClient) { }

  // list(): Observable<BackendReturn>{
  //   const url = `${this.API}/list-transfers`
  //   return this.http.get<BackendReturn>(url)
  // }
  list(): Observable<BackendReturn> {
    const email = this.getUserFromToken();
    const url = email
      ? `${this.API}/list-transfers?email=${encodeURIComponent(email)}`
      : `${this.API}/list-transfers`;
  
    return this.http.get<BackendReturn>(url);
  }

  create(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.API, transfer);
  }

  getUserFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub || null;
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }


}
