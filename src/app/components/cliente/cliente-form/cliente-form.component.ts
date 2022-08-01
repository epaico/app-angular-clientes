import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styles: []
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente;
  titulo: string = "Nuevo Cliente"

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.cliente = new Cliente(0, "", "", "");
  }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.activatedRouter.params.subscribe(param => {
      let idCliente = param['id'];
      if (idCliente) {
        this.clienteService.getClienteById(idCliente)
          .subscribe(data => this.cliente = data);
      }
    })
  }

  saveCliente(): void {
    this.clienteService.saveCliente(this.cliente)
      .subscribe(data => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: "success",
          title: "Cliente",
          text: `Cliente ${data.nombre} Guardado correctamente`
        });
      });
  }

  updateCliente(): void {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(cli => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: "success",
          title: "Cliente",
          text: `Cliente ${cli.nombre} actualizado correctamente`
        });
      })
  }

}
