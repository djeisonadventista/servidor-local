interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    porcentagemDesconto: number;
}

let catalogoServicos: ServicoType[] = [];

//adicionar um servico novo

export function adicionarServico(novoServico: ServicoType) {

    if (!novoServico.nome) {
        return { status: false, mensagem: "Nome do serviço é obrigatório." };
    }

    if (novoServico.precoHora <= 0) {
        return { status: false, mensagem: "O preço por hora deve ser maior que 0." };
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return { status: false, mensagem: "Serviço já existe no sistema." };
        }
    }

    catalogoServicos.push(novoServico);

    return {
        status: true,
        mensagem: "Serviço adicionado com sucesso!",
        totalServicos: catalogoServicos.length,
        servicoAdicionado: novoServico
    };
}

//listar todos os servicos
export function listarServicos(): ServicoType[] {
    // TODO: implementar paginação e filtros
    return catalogoServicos;
}


//apagar um serviço
export function apagarServico(nomeServico: string): boolean {
    //TODO: implementar função de apagar serviço

const novoCatalogoTemporario: ServicoType[] = [];

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nomeServico) {
            novoCatalogoTemporario.push(catalogoServicos[i]!);
        }
    } // devolve um novo catalogo sem o serviço que foi apagado

    catalogoServicos = novoCatalogoTemporario;
    return true;
}

//obter um serviço específico pelo nome
export function obterServico(nomeServico: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nomeServico) {
            return catalogoServicos[i]!;
        }
    }
    return null;
}