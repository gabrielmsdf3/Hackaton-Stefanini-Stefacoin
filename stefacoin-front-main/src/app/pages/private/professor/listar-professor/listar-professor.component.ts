import { Component, OnInit } from "@angular/core"
import { ProfessorService } from "src/app/services/professor.service"

@Component({
  selector: "app-listar-professor",
  templateUrl: "./listar-professor.component.html",
  styleUrls: ["./listar-professor.component.css"],
})
export class ListarProfessorComponent implements OnInit {
  professor: any[]

  constructor(private professorService: ProfessorService) {}

  onClick() {
    //this.professor = this.professorService.all()
    let data = this.professorService.all()
    console.log(data)
  }

  ngOnInit(): void {}
}
