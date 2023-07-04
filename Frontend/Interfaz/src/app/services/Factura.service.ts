import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private _http: HttpClient) {}

  addFactura(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/app/facturas/nueva', data);
  }

  updateFactura(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/app/facturas/actualizar/factura/${id}`, data);
  }

  getFacturas(): Observable<any> {
    return this._http.get('http://localhost:8080/app/facturas/todas');
  }
  getFacturasPorIdentificacion(identificacion: string): Observable<any> {
    return this._http.get(`http://localhost:8080/app/facturas/factura/persona/${identificacion}`);
  }

  deleteFactura(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/app/facturas/eliminar/factura/${id}`);
  }

}
