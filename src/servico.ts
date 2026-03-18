import db from "./lib/db.js";
import { type ResponseType, type ServiceDBType, type ServicoType, } from "./utils/types.js";
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

    if (Array.isArray(rows) && rows.length === 0) return null

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
            (id, nome, descricao, categoria, enabled_at, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                null,
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

// Funcao para listar servico

export async function listaServicos() {
    try {

        const [rows] = await db.execute(
            "SELECT * FROM tbl_servicos"
        );

        return rows;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addServiceToDB(newService: ServiceDBType) {
    console.log({ newService })

    try {

        const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

        const values = [
            null,
            newService.nome,
            newService.descricao,
            newService.categoria,
            newService.enabled_at,
            new Date(),
            new Date()
        ]
        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getServiceById(id: string) {
    try {

        const query = `SELECT * FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null


    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getAllService() {
    try {

        const query = `SELECT * FROM tbl_servicos`

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error);
        return null
    }
}

//update de dados
export async function updateService(id: string, updatedService: ServiceDBType) {
    try {
        const query = `UPDATE tbl_servicos
        SET
        nome=?,
        descricao=?,
        categoria=?,
        enabled_at=?,
        updated_at=?
        WHERE
        id=?
        `;

        const values = [
            updatedService.nome,
            updatedService.descricao,
            updatedService.categoria,
            updatedService.enabled_at,
            new Date(),
            id
        ]
        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function deleteService(id: string) {
    try {

        const query = `DELETE  FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows: any = await db.execute(query, value)

        return rows [0]?.affetedRows === 0 ? null : rows

    } catch (error) {
        console.log(error);
        return null
    }
}
