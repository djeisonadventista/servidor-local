interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    porcentagemDesconto: number;
}

let catalogoServicos: ServicoType[] = [];

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


