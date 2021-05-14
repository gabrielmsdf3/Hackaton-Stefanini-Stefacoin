import express, { NextFunction, Request, Response } from "express"
import AulaController from "../controllers/aula.controller"
import Aula from "../models/aula.model"
import UnauthorizedException from "../utils/exceptions/unauthorized.exception"
import Mensagem from "../utils/mensagem"

const router = express.Router()

router.post("/aula", async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.uid.tipo !== 1) {
      throw new UnauthorizedException(
        "Apenas um professor pode incluir uma aula"
      )
    }
    const mensagem: Mensagem = await new AulaController().incluir(req.body)
    res.json(mensagem)
  } catch (e) {
    next(e)
  }
})

router.put("/aula/:id", async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    if (req.uid.tipo !== 1) {
      throw new UnauthorizedException(
        "Apenas um professor pode editar uma aula"
      )
    }

    const mensagem: Mensagem = await new AulaController().alterar(
      Number(id),
      req.body
    )
    res.json(mensagem)
  } catch (e) {
    next(e)
  }
})

router.delete(
  "/aula/:id",
  async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.uid.tipo !== 1) {
        throw new UnauthorizedException(
          "Apenas um professor pode excluir uma aula"
        )
      }
      const { id } = req.params
      const { idCurso } = req.query
      const aulas: Mensagem = await new AulaController().excluir(
        Number(id),
        Number(idCurso)
      )
      res.json(aulas)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  "/aula/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { idCurso } = req.query
      const aula: Aula = await new AulaController().obterPorId(
        Number(id),
        Number(idCurso)
      )
      res.json(aula)
    } catch (e) {
      next(e)
    }
  }
)

router.get("/aula", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idCurso } = req.query
    const aulas: Aula[] = await new AulaController().listar(Number(idCurso))
    res.json(aulas)
  } catch (e) {
    next(e)
  }
})

export default router
