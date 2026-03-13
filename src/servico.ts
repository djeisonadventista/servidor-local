import db from "./lib/db.js";
import { type ResponseType, type ServicoType, } from "./utils/types.js";
export let catalogoServicos: ServicoType[] = []

// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}



export async function getServicos() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos");
    return rows;
}

export async function getServicosById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_servicos WHERE id = ?",
        [id]
    );

    if (Array.isArray(rows) && rows.length === 0) return null;

    return Array.isArray(rows) ? rows[0] : null;
}
export async function createServicos(
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean
) {
    try {

        const [rows] = await db.execute(
            `INSERT INTO tbl_servicos
            (id, nome, descricao, categoria, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                nome,
                descricao,
                categoria,
                enabled,
                new Date(),
                new Date()
            ]
        );

        console.log({ rows });

        return rows;

    } catch (error) {
        console.log(error);
        return null;
    }
}