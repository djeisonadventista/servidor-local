import express from "express";

const app = express();


app.get("/hello", (req, res) => {
console.log("Hello World");
res.send("Hello World");
});

app.listen(8080, () => {
console.log("Servidor rodando na porta 8080");
});