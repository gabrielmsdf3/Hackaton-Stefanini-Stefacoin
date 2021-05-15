import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Mensagem } from "../models/mensagem"
import { Curso } from "../models/curso"

const URL = "http://localhost:3000/stefanini/professor"

@Injectable({
  providedIn: "root",
})
export class CursoService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Curso>): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(URL, {
      params: filtro,
    })
  }

  obter(id: string) {
    return this.httpClient.get<Curso>(`${URL}/${id}`)
  }

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso)
  }

  alterar(id: string, curso: Curso) {
    return this.httpClient.put<Curso>(`${URL}/${id}`, curso)
  }

  excluir(id: string) {
    return this.httpClient.delete<Curso>(`${URL}/${id}`)
  }
}
