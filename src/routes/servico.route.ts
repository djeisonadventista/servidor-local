import { ServicoController } from "../controllers/servico.controller.js";
import { Router } from "express";

const ServiceRoute= {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllDetailed: "/all-detailed",
}

const router = Router()

router.get(ServiceRoute.getAll, ServicoController.getAll)
router.get(ServiceRoute.getById, ServicoController.get)
router.post(ServiceRoute.create, ServicoController.createServico)
router.put(ServiceRoute.update, ServicoController.update)
router.delete(ServiceRoute.delete, ServicoController.delete)
router.get(ServiceRoute.getAllDetailed, ServicoController.getAllServicoDetalhado)

export { router }