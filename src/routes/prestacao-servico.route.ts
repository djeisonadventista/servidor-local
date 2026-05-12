import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao-servico.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhado: "/get-all-detalhado"
}

const router = Router()
router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.get)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhado, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAllPrestacaoServicoDetalhado)

router.use(AuthMiddleware);

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), PrestacaoServicoController.create)
router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete,  authorize([Role.ADMIN]), PrestacaoServicoController.delete)


export { router }
