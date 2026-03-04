
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




// funcao para selecionar prestador de servico pelo nome
export function selecionarPrestador(nomePrestador: string) {

    // verificar se o prestador existe
    for (let i = 0; i < prestadorDeServico.length; i++) {
        if (prestadorDeServico[i]?.nome === nomePrestador) {

            // se existir, adicionar na lista de selecionados
            prestadoresSelecionados.push(prestadorDeServico[i]!);

            return {
                status: true,
                message: "Prestador selecionado com sucesso!",
                data: prestadorDeServico[i]
            };
        }
    }

    // se nao existir
    return {
        status: false,
        message: "Prestador não encontrado!",
        data: null
    };
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


//funcao para editar um prestador de serviço
export function editarPrestadorDeServico(nomePrestador: string, novoDadosDoPrestador: PrestadorType) {
    //encontrar o prestador de servico  a editar na minha lista
    //ciclo que percorre  a lista e verifica o nome do prestador de serviço
    prestadorDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomePrestador) {
            prestadorExistente.nome = novoDadosDoPrestador.nome;
            prestadorExistente.precoHora = novoDadosDoPrestador.precoHora;
            prestadorExistente.profissao = novoDadosDoPrestador.profissao;
            prestadorExistente.minimoParaDesconto = novoDadosDoPrestador.minimoParaDesconto;
            prestadorExistente.percentagemDesconto = novoDadosDoPrestador.percentagemDesconto;
            prestadorExistente.taxaUrgencia = novoDadosDoPrestador.taxaUrgencia;

            return { status: true, message: "Prestador de serviço editado com sucesso!", data: prestadorExistente }
        }
    })
    // se nao nao existir nenhum prestador com o nome recebido , retorna uma mensagem de erro
    return { status: false, message: "Prestador de serviço não encontrado!", data: null }
}


/*
 //prestadorDeServico.replace()

//funcao para apagar um prestador de serviço
export function apagarPrestadorDeServico(nomePrestador: string) {
   //encontrar o prestador de serviço a apagar na minha lista

   //ciclo para percorrer a lista de prestadores de serviço e mostrar os seus dados
    for (let i = 0; i < prestadorDeServico.length; i++) {

//if para verificar se onome do prestador for igual ao nome recebido, 
        if (prestadorDeServico[i]?.nome === nomePrestador) {

 //se encontrado, remover o prestador
            prestadorDeServico.splice(i, 1);

//retornar mensagem de sucesso
            return {
                status: true,
                message: "Prestador removido com sucesso!",
                data: null
            };
        }
    }

 //se nao existir nenhum prestador com o nome recebido, retorna mensagem de erro
    return {
        status: false,
        message: "Prestador não encontrado!",
        data: null
    };
}

  */

export function listarPrestadoresDeServico() {
    return prestadorDeServico;
}

//funcao para obter um prestador de serviço pelo nome
export function apagarPrestadorDeServico(nomePrestador: string) {


    /*
    for (let i = 0; i < prestadorDeServico.length; i++) {

        if (prestadorDeServico[i]?.nome === nomePrestador) {

            return {
                status: true,
                message: "Prestador encontrado!",
                data: prestadorDeServico[i]
            };
        }
    }

    return {
        status: false,
        message: "Prestador não encontrado!",
        data: null
    };
}

*/

    // validacao do nome do prestador
    if (nomePrestador === "") {
        // se o prestador ja existe, retorna uma mensagem de erro
        return {
            status: false,
            message: " Nome do prestadoe é obrigatorio",
            data: null
        }
    }

    const prestadorExiste = prestadorDeServico.some((prestadorExistente: PrestadorType) => prestadorExistente.nome === nomePrestador);
    if (!prestadorExiste) {
        return {
            status: false,
            message: "Nao existe nenhum prestador de servico com esse nome",
            data: null
        }
    }


    prestadorDeServico.filter((prestadorExistente: PrestadorType) => prestadorExistente.nome !== nomePrestador)


    return {
        status: true,
        message: "Prestador removido com sucesso!",
        data: prestadorDeServico
    }
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


