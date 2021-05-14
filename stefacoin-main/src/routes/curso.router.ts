import express, { NextFunction, Request, Response } from "express"
import CursoController from "../controllers/curso.controller"
import Curso from "../entities/curso.entity"
import UnauthorizedException from "../utils/exceptions/unauthorized.exception"
import Mensagem from "../utils/mensagem"

const router = express.Router()

router.post("/curso", async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.uid.tipo !== 1) {
      throw new UnauthorizedException("Apenas um professor pode criar um curso")
    }
    const mensagem: Mensagem = await new CursoController().incluir(req.body)
    res.json(mensagem)
  } catch (e) {
    next(e)
  }
})

router.put(
  "/curso/:id",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.uid.tipo !== 1) {
        throw new UnauthorizedException(
          "Apenas um professor pode criar um curso"
        )
      }
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
