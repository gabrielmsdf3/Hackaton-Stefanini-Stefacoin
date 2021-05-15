import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Mensagem } from "../models/mensagem"
import { Aluno } from "../models/aluno"

//alteração
const URL = "http://localhost:3000/stefanini/aluno"

@Injectable({
  providedIn: "root",
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Aluno>): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(URL, {
      params: filtro,
    })
  }

  obter(id: string) {
    return this.httpClient.get<Aluno>(`${URL}/${id}`)
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aluno)
  }

  alterar(id: string, aluno: Aluno) {
    return this.httpClient.put<Aluno>(`${URL}/${id}`, aluno)
  }

  excluir(id: string) {
    return this.httpClient.delete<Aluno>(`${URL}/${id}`)
  }
}
