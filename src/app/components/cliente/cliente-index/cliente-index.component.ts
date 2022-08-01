import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styles: []
})
export class ClienteIndexComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes() {
    this.clienteService.getAllClientes()
      .subscribe(data => this.clientes = data);
  }

  eliminarCliente(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta Seguro?',
      text: `Desea eliminar el cliente ${cliente.nombre} !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("eliminando")
        this.clienteService.delete(cliente.id)
          .subscribe(response => {
            this.clientes = this.clientes.filter( c => c.id !== cliente.id);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              'Cliente se ha eliminado correctamente.',
              'success'
            )
          })

      }
    })
  }

}
