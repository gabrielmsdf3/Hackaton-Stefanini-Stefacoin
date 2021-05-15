import { Component, OnInit } from "@angular/core"
import { AuthService } from "src/app/services/auth.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
  nome: string = ""
  email: string = ""
  tipo: string = "Aluno"
  ngOnInit(): void {
    let user = this.authService.getUsuario()
    this.nome = user.nome
    if (user.tipo === 1) {
      this.tipo = "Professor"
    }
    console.log(user)
  }
}
