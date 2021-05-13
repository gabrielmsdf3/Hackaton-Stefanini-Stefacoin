import Professor from "../entities/professor.entity"
import cursoRepository from "../repositories/curso.repository"
import ProfessorRepository from "../repositories/professor.repository"
import { FilterQuery } from "../utils/database/database"
import BusinessException from "../utils/exceptions/business.exception"
import Mensagem from "../utils/mensagem"
import { Validador } from "../utils/utils"

export default class ProfessorController {
  async obterPorId(id: number): Promise<Professor> {
    Validador.validarParametros([{ id }])

    return await ProfessorRepository.obterPorId(id)
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<Professor> {
    return await ProfessorRepository.obter(filtro)
  }

  // #pegabandeira - *Resolvido
  async listar(filtro: FilterQuery<Professor> = {}): Promise<Professor[]> {
    const professores = await ProfessorRepository.listar(filtro)

    for (const professor of professores) {
      professor.cursos = await cursoRepository.listar({
        idProfessor: professor.id,
      })
    }
    return professores
  }

  // #pegabandeira
  async incluir(professor: Professor) {
    const { nome, email, senha } = professor

    Validador.validarParametros([{ nome }, { email }, { senha }])
    professor.tipo = 1

    if (await ProfessorRepository.obter({ email })) {
      throw new BusinessException("Error, e-mail já cadastrado!")
    }

    return new Mensagem("Professor incluido com sucesso!", {
      id: await ProfessorRepository.incluir(professor),
    })
  }

  async alterar(id: number, professor: Professor) {
    const { nome, senha } = professor

    delete professor.email

    Validador.validarParametros([{ id }, { nome }, { senha }])

    await ProfessorRepository.alterar({ id }, professor)

    return new Mensagem("Professor alterado com sucesso!", {
      id,
    })
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }])

    await ProfessorRepository.excluir({ id })

    return new Mensagem("Professor excluido com sucesso!", {
      id,
    })
  }
}
