import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favorite {
  id?: number;
  userId: string;
  contaDestino: string;
  nomeFavorito: string;
}
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  
  private apiUrl = 'http://localhost:8080/api/v1/favorites';

  constructor(private http: HttpClient) {}

 
  getFavorites(userId: string): Observable<Favorite[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Favorite[]>(`${this.apiUrl}`, { params });
  }
  saveFavorite(fav: Favorite): Observable<any> {
    return this.http.post(`${this.apiUrl}`, fav);
  }
}
