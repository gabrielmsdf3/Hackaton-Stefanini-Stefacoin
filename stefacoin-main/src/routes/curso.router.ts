import express, { NextFunction, Request, Response } from "express"
import CursoController from "../controllers/curso.controller"
import Curso from "../entities/curso.entity"
import alunoRepository from "../repositories/aluno.repository"
import NotFoundException from "../utils/exceptions/notFound.exception"
import Mensagem from "../utils/mensagem"

const router = express.Router()

router.post(
  "/curso",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mensagem: Mensagem = await new CursoController().incluir(req.body)
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.put(
  "/curso/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const mensagem: Mensagem = await new CursoController().alterar(
        Number(id),
        req.body
      )
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.put(
  "/curso/:id/matricular",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const aluno = await alunoRepository.obter({ email: req.uid.email })

      if (!aluno) {
        throw new NotFoundException("Aluno não encontrado")
      }
      const mensagem: Mensagem = await new CursoController().matricular(
        Number(id),
        aluno
      )
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  "/curso/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const mensagem: Mensagem = await new CursoController().excluir(Number(id))
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  "/curso/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const curso: Curso = await new CursoController().obterPorId(Number(id))
      res.json(curso)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  "/curso",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursos: Curso[] = await new CursoController().listar()
      res.json(cursos)
    } catch (e) {
      next(e)
    }
  }
)

export default router
