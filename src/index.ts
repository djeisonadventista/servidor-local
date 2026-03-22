import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";

const app = express();
app.use(express.json());

app.use("/service", serviceRouter)


/*
import { UsersController } from "./controllers/users.controller.js";

app.post("/users", UsersController.createUser);
app.get("/users", UsersController.getAll);
app.get("/users/:id", UsersController.get);

*/






app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
