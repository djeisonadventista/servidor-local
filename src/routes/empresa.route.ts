import { Router } from "express";
import { EmpresaController } from "../controllers/empresa.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const EmpresaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(EmpresaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.getAll);
router.get(EmpresaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.get);

router.use(AuthMiddleware);

router.post(EmpresaRoute.create, authorize([Role.ADMIN]), EmpresaController.create);
router.put(EmpresaRoute.update, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.update);
router.delete(EmpresaRoute.delete, authorize([Role.ADMIN]), EmpresaController.delete);

export { router };
