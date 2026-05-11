
import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacao-servico.route.js";
import { router as empresaRouter } from "./routes/empresa.route.js";
import { router as categoriaRouter } from "./routes/categoria.route.js";
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./graphql/index.js";
import { expressMiddleware } from "@as-integrations/express5";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "authorization"],
}));

app.use(express.json());

app.use("/service", serviceRouter)
app.use("/users", usersRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/proposta", propostaRouter)
app.use("/prestador", prestadorRouter)
app.use("/prestacao-servico", prestacaoServicoRouter)
app.use("/empresa", empresaRouter)
app.use("/categoria", categoriaRouter)


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
})

await graphqlServer.start();

app.use("/graphql", expressMiddleware(graphqlServer, {
    context: async ({ req }) => ({
        token: req.headers.authorization,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
    }),
})
)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});




/*
import router from "./routes";

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(8080, () => {
  console.log("Servidor rodando...");
});

*/