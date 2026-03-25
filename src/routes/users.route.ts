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


router.get(UsersRoute.getAll, UsersController.getAll);
router.get(UsersRoute.getById, UsersController.getById);
router.post(UsersRoute.create, UsersController.create);
router.put(UsersRoute.update, UsersController.update);
router.delete(UsersRoute.delete, UsersController.delete);

export { router };