import { UsersController } from "../controllers/users.controller.js";
import { Router } from "express";

const UsersRoute = {
    create: "/create",
    getById: "/:id",
    getAll: "/",
    update: "/:id",
    delete: "/:id",
};

const router = Router();

// Buscar todos
router.get(UsersRoute.getAll, UsersController.getAll);

// Buscar por ID
router.get(UsersRoute.getById, UsersController.getById);

// Criar
router.post(UsersRoute.create, UsersController.create);

// Atualizar
router.put(UsersRoute.update, UsersController.update);

// Apagar
router.delete(UsersRoute.delete, UsersController.delete);

export { router };