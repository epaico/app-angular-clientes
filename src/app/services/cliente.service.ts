import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Cliente} from "../models/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url_api = "http://localhost:8081/api";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {

  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.url_api}/clientes`)
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return new Cliente(item.id, item.nombre, item.apellido, item.email)
          });
        })
      );
  }

  getClienteById(idCliente:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url_api}/clientes/${idCliente}`)
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${this.url_api}/clientes`, cliente, {"headers": this.headers});

  }
}
