
import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestadorRoute.create, PrestadorController.create)
router.get(PrestadorRoute.getAll, PrestadorController.getAll)
router.get(PrestadorRoute.getById, PrestadorController.get)
router.put(PrestadorRoute.update, PrestadorController.update)
router.delete(PrestadorRoute.delete, PrestadorController.delete)

export { router }
