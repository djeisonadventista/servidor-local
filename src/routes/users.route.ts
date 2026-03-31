import { UsersController } from "../controllers/users.controller.js";
import { Router } from "express";
import AuthMiddleware from "../security/auth.middleware.js";

const UsersRoute = {
    create: "/create",
    getById: "/:id",
    getAll: "/",
    update: "/:id",
    delete: "/:id",
    login: "/login",
};

const router = Router();

router.post(UsersRoute.login, UsersController.login);
router.post(UsersRoute.create, UsersController.create);
router.get(UsersRoute.getAll, AuthMiddleware, UsersController.getAll);
router.get(UsersRoute.getById, UsersController.getById);
router.put(UsersRoute.update, UsersController.update);
router.delete(UsersRoute.delete, UsersController.delete);

export { router };