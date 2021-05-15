import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { retry } from "rxjs/operators"
import { Mensagem } from "../models/mensagem"
import { Professor } from "../models/professor"

const URL = "http://localhost:3000/stefanini/professor"

@Injectable({
  providedIn: "root",
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Professor>): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(URL, {
      params: filtro,
    })
  }

  all(): Observable<any> {
    return this.httpClient.get<any>(URL).pipe(retry(2))
  }

  obter(id: string) {
    return this.httpClient.get<Professor>(`${URL}/${id}`)
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor)
  }

  alterar(id: string, professor: Professor) {
    return this.httpClient.put<Professor>(`${URL}/${id}`, professor)
  }

  excluir(id: string) {
    return this.httpClient.delete<Professor>(`${URL}/${id}`)
  }
}
