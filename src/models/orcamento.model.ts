import {
    calcularOrcamento,
    selecionarServico,
    selecionarPrestador,
    criarPrestadorDeServico,
    editarPrestadorDeServico,
    apagarPrestadorDeServico,
    listarPrestadoresDeServico
} from "../orcamento.js";

export const OrcamentoModel = {

    calcular(pedido: any) {
        try {
            const total = calcularOrcamento(pedido);
            return total;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    selecionarServico(nome: string) {
        try {
            return selecionarServico(nome);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    selecionarPrestador(nome: string) {
        try {
            return selecionarPrestador(nome);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    criarPrestador(prestador: any) {
        try {
            return criarPrestadorDeServico(prestador);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    editarPrestador(nome: string, dados: any) {
        try {
            return editarPrestadorDeServico(nome, dados);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    apagarPrestador(nome: string) {
        try {
            return apagarPrestadorDeServico(nome);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    listarPrestadores() {
        try {
            return listarPrestadoresDeServico();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};