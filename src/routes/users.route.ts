import { UsersController } from "../controllers/users.controller.js";
import { Router } from "express";

const UsersRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
};

const router = Router()

router.get(UsersRoute.getAll, UsersController.getAll);
router.get(UsersRoute.getById, UsersController.get);
router.post(UsersRoute.create, UsersController.createUser);

export { router }