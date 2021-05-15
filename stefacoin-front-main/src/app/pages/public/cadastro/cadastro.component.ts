import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required),
  })

  ngOnInit(): void {}
}
