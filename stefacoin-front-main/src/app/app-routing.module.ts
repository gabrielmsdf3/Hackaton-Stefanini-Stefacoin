import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuardService } from "./guards/auth-guard.service"
import { HomeComponent } from "./pages/private/home/home.component"
import { CadastroComponent } from "./pages/public/cadastro/cadastro.component"
import { LoginComponent } from "./pages/public/login/login.component"
import { PaginaNaoEncontradaComponent } from "./pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component"
import { ListarProfessorComponent } from "./pages/private/professor/listar-professor/listar-professor.component"
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: "professor",
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent,
  },
  {
    path: "nova-conta",
    component: CadastroComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: PaginaNaoEncontradaComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
