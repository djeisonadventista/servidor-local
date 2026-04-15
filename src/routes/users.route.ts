import { UsersController } from "../controllers/users.controller.js";
import { Router } from "express";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const UsersRoute = {
    create: "/create",
    getById: "/:id",
    getAll: "/",
    update: "/:id",
    delete: "/:id",
    login: "/login",
    updatePassword: "/update-password/:id",
    resetPassword: "/reset-password",
};

const router = Router();

router.post(UsersRoute.login, UsersController.login);
router.post(UsersRoute.create, UsersController.createUsers);

router.use(AuthMiddleware)

router.get(UsersRoute.getAll, authorize([Role.ADMIN]), UsersController.getAll);
router.get(UsersRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UsersController.getById);
router.put(UsersRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UsersController.update);
router.delete(UsersRoute.delete, authorize([Role.ADMIN]), UsersController.delete);
router.put(UsersRoute.updatePassword, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UsersController.updatePassword);
router.put(UsersRoute.resetPassword, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), UsersController.resetPassword);

export { router };