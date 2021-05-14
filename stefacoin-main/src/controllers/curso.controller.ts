import Aluno from "../entities/aluno.entity"
import Curso from "../entities/curso.entity"
import alunoRepository from "../repositories/aluno.repository"
import CursoRepository from "../repositories/curso.repository"
import { FilterQuery } from "../utils/database/database"
import BusinessException from "../utils/exceptions/business.exception"
import Mensagem from "../utils/mensagem"
import { Validador } from "../utils/utils"

export default class CursoController {
  async obterPorId(id: number): Promise<Curso> {
    Validador.validarParametros([{ id }])
    return await CursoRepository.obterPorId(id)
  }

  async obter(filtro: FilterQuery<Curso> = {}): Promise<Curso> {
    return await CursoRepository.obter(filtro)
  }

  async listar(filtro: FilterQuery<Curso> = {}): Promise<Curso[]> {
    const listaCursos = await CursoRepository.listar(filtro)

    return listaCursos
  }

  async incluir(curso: Curso) {
    const { nome, descricao, aulas, idProfessor } = curso
    Validador.validarParametros([
      { nome },
      { descricao },
      { aulas },
      { idProfessor },
    ])

    if (await CursoRepository.obter({ nome })) {
      throw new BusinessException("Error, Curso ja cadastrado")
    }

    return new Mensagem("Aula incluido com sucesso!", {
      id: await CursoRepository.incluir(curso),
    })
  }

  async alterar(id: number, curso: Curso) {
    const { nome, descricao, aulas, idProfessor } = curso
    Validador.validarParametros([
      { id },
      { nome },
      { descricao },
      { aulas },
      { idProfessor },
    ])

    await CursoRepository.alterar({ id }, curso)

    return new Mensagem("Aula alterado com sucesso!", {
      id,
    })
  }

  async excluir(id: number) {
    const alunos = await alunoRepository.listar()
    alunos.forEach((aluno) => {
      if (aluno.cursos.find((curso) => curso.id === id)) {
        throw new BusinessException(
          "Existe algum aluno matriculado neste curso e ele não pode ser deletado"
        )
      }
    })
    Validador.validarParametros([{ id }])

    await CursoRepository.excluir({ id })

    return new Mensagem("Aula excluido com sucesso!", {
      id,
    })
  }
}
