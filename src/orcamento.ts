import { stat } from "node:fs";
import { catalogoServicos } from "./servico.js";
import { type pedidoServicoType, type PrestadorType, type ServicoType } from "./utils/types.js";

const taxaUrgencia: number = 1.3;
const minimoDesconto: number = 100;
const porcentagemDesconto: number = 0.1;

const servicosSelecionados: ServicoType[] = [];
const prestadorDeServico: PrestadorType[] = [];
const prestadoresSelecionados: PrestadorType[] = [];

// funcao para selecionar servico e horaEstimada
export function selecionarServico(nomeServico: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nomeServico) {
            servicosSelecionados.push(catalogoServicos[i]!);
            return true
        }
    }
    return false
}

//funcao para criar prestador de serviço
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    //verificar se o prestador ja esta no array
    prestadorDeServico.map((prestadoeExistente: PrestadorType) => {
        if (prestadoeExistente.nome === novoPrestador.nome) {
            // se o prestador ja existe, retorna uma mensagem de erro
            return { status: false, message: " Já existe um Prestador com esse nome!", data: null }
        }
    })

    // se o prestador nao existir, adicionamos o novo prestador
    prestadorDeServico.push(novoPrestador);
    return { status: true, message: "Prestador de servico adicionado com sucesso!", data: novoPrestador }
}

//funcao para calculara o orcamento
export function calcularOrcamento(pedido: pedidoServicoType) {
    let totalBruto: number = 0;
    let totalFinal: number = 0;

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico = servico.precoHora * pedido.horasEstimadas;
        totalBruto = totalBruto + totalDoServico;
    })

    totalFinal = totalBruto;

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia);
    }

    if (totalBruto >= minimoDesconto) {
        totalFinal = totalFinal - (totalBruto * porcentagemDesconto);
    }

    return totalFinal;
    // () => {} --- arrow function
    // funtio () {} --- function normal




    /*
    urgrente: true
    totalBruto = 100
    taxaUrgencia = 1.3
    totalTaxa: 100 * .3 = 30
    totalFinal = 100 + 30 = 130
 
    totalBruto = 100
  totalbruto apos desconto = 100
  minimoDesconto = 100
  percentagem = 10%
  desconto sobre total final: 150 * 0.1 = 15
  desconto sobre total bruto: 100 * 0.1 = 10
 
 
    */
}