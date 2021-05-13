import express, { NextFunction, Request, Response } from "express"
import AlunoController from "../controllers/aluno.controller"
import Aluno from "../entities/aluno.entity"
import alunoRepository from "../repositories/aluno.repository"
import BusinessException from "../utils/exceptions/business.exception"
import UnauthorizedException from "../utils/exceptions/unauthorized.exception"
import Mensagem from "../utils/mensagem"

const router = express.Router()

router.post(
  "/aluno",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mensagem: Mensagem = await new AlunoController().incluir(req.body)
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.put(
  "/aluno/:id",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (req.uid.tipo !== 1) {
        const aluno = await alunoRepository.obter({
          email: req.uid.email,
        })
        if (aluno.id !== id) {
          throw new UnauthorizedException(
            "Você não pode alterar as informações de outro aluno"
          )
        }
      }

      const mensagem: Mensagem = await new AlunoController().alterar(
        Number(id),
        req.body
      )
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  "/aluno/:id",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (req.uid.tipo !== 1) {
        throw new BusinessException(
          "Somente um professor pode deletar um aluno"
        )
      }
      const mensagem: Mensagem = await new AlunoController().excluir(Number(id))
      res.json(mensagem)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  "/aluno/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const aluno: Aluno = await new AlunoController().obterPorId(Number(id))
      res.json(aluno)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  "/aluno",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alunos: Aluno[] = await new AlunoController().listar()
      res.json(alunos)
    } catch (e) {
      next(e)
    }
  }
)

export default router
