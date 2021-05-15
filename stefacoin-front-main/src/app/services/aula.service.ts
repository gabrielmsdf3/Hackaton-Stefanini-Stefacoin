import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Mensagem } from "../models/mensagem"
import { Aula } from "../models/aula"

const URL = "http://localhost:3000/stefanini/aula"

@Injectable({
  providedIn: "root",
})
export class AulaService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Aula>): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(URL, {
      params: filtro,
    })
  }

  obter(id: string) {
    return this.httpClient.get<Aula>(`${URL}/${id}`)
  }

  incluir(professor: Aula): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor)
  }

  alterar(id: string, professor: Aula) {
    return this.httpClient.put<Aula>(`${URL}/${id}`, professor)
  }

  excluir(id: string) {
    return this.httpClient.delete<Aula>(`${URL}/${id}`)
  }
}
