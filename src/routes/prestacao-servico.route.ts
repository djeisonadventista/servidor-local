import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao-servico.controller.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, PrestacaoServicoController.delete)

export { router }
