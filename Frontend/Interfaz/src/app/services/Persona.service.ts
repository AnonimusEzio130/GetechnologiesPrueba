import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _http: HttpClient) {}

  addUsuario(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/app/personas/nueva/persona', data);
  }

  updateUsuario(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/app/usuario/updatePerson/${id}`, data);
  }

  getUsuarioList(): Observable<any> {
    return this._http.get('http://localhost:8080/app/personas/todaslaspersonas');
  }

  deleteUsuario(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/app/personas/eliminar/persona/id/${id}`);
  }

  getUsuario(id: number): Observable<any> {
    return this._http.get(`http://localhost:8080/app/personas/obtener/persona/id/${id}`);
  }
}