import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, map, catchError, throwError} from "rxjs";
import {Cliente} from "../models/cliente";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url_api = "http://localhost:8081/api";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) {

  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.url_api}/clientes/all`)
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return new Cliente(item.id, item.nombre, item.apellido, item.email)
          });
        })
      );
  }

  getClienteById(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url_api}/clientes/${idCliente}`)
      .pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          Swal.fire(
            'Clientes',
            e.error.message,
            'error'
          );
          return throwError(e);
        })
      );
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${this.url_api}/clientes/add`, cliente, {"headers": this.headers})
      .pipe(
        catchError(e => {
          Swal.fire(
            'Error al Guardar',
            e.error.message,
            'error'
          );
          return throwError(e);
        })
      );

  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url_api}/clientes/update`, cliente,
      {"headers": this.headers})
      .pipe(
        catchError(e => {
          Swal.fire(
            'Error al Actualizar',
            e.error.message,
            'error'
          );
          return throwError(e);
        })
      );

  }

  delete(idCliente: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url_api}/clientes/delete/${idCliente}`)
      .pipe(
        catchError(e => {
          Swal.fire(
            'Error al Eliminar',
            e.error.message,
            'error'
          );
          return throwError(e);
        })
      );
  }
}
