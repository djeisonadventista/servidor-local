import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(OrcamentoRoute.create, OrcamentoController.create)
router.get(OrcamentoRoute.getAll, OrcamentoController.getAll)
router.get(OrcamentoRoute.getById, OrcamentoController.get)
router.put(OrcamentoRoute.update, OrcamentoController.update)
router.delete(OrcamentoRoute.delete, OrcamentoController.delete)

export { router }

