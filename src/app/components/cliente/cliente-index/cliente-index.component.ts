import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styles: [
  ]
})
export class ClienteIndexComponent implements OnInit {

  clientes : Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes(){
    this.clienteService.getAllClientes()
      .subscribe(data => this.clientes = data);
  }

}
