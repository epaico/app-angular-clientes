import {Routes} from "@angular/router";
import {ClienteIndexComponent} from "./components/cliente/cliente-index/cliente-index.component";
import {ClienteFormComponent} from "./components/cliente/cliente-form/cliente-form.component";

export  const appRoutes : Routes = [
  {path:"clientes", component: ClienteIndexComponent},
  {path:"clientes/create", component: ClienteFormComponent},
  {path:"clientes/update/:id", component: ClienteFormComponent}
];
