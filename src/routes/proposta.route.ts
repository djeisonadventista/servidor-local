
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.model.js"

const PropostaRoute = {
create: "/create",
getAll: "/",
getById: "/get/:id",
update: "/update/:id",
delete: "/delete/:id",
aceitar: "/aceitar/:id"
}

const router = Router()

router.get(PropostaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.getAll)
router.get(PropostaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.get)

router.use(AuthMiddleware)

router.post(PropostaRoute.create, authorize([Role.CLIENTE]), PropostaController.create)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "Owner"),PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN]),  isOwner(PropostaModel, "Owner"), PropostaController.delete)
router.put(PropostaRoute.aceitar, authorize([Role.PRESTADOR, Role.EMPRESA]), PropostaController.aceitar)


export { router }
