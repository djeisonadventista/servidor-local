
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"

const router = Router()

router.post("/", PropostaController.create)
router.get("/", PropostaController.getAll)
router.get("/:id", PropostaController.get)
router.put("/:id", PropostaController.update)
router.delete("/:id", PropostaController.delete)

export { router }