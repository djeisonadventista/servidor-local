import { Router } from "express";
import { OrcamentoController } from "../controllers/orcamento.controller.js";

const OrcamentoRoute = {
    calcular: "/calcular",
    selecionarServico: "/selecionar-servico",
    selecionarPrestador: "/selecionar-prestador",
    criarPrestador: "/criar-prestador",
    editarPrestador: "/editar-prestador",
    apagarPrestador: "/apagar-prestador",
};

const router = Router();

router.post(OrcamentoRoute.calcular, OrcamentoController.calcular);
router.post(OrcamentoRoute.selecionarServico, OrcamentoController.selecionarServico);
router.post(OrcamentoRoute.selecionarPrestador, OrcamentoController.selecionarPrestador);
router.post(OrcamentoRoute.criarPrestador, OrcamentoController.criarPrestador);
router.put(OrcamentoRoute.editarPrestador, OrcamentoController.editarPrestador);
router.delete(OrcamentoRoute.apagarPrestador, OrcamentoController.apagarPrestador);

export { router };