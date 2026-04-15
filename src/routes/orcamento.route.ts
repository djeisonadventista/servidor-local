import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(OrcamentoRoute.getAll, OrcamentoController.getAll)
router.get(OrcamentoRoute.getById, OrcamentoController.get)

router.use(AuthMiddleware);

router.post(OrcamentoRoute.create,  authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.create)
router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.update)
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)

// trabalho final..................................................
router.put("/:id/calcular", authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.calculateBudget);
export { router }

