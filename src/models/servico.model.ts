import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { ServiceDBType, ServicoDetalhadoType } from "../utils/types.js"


export const ServiceModel = {
    async create(newService: ServiceDBType): Promise<ServiceDBType | null> {

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
            const [rows] = await db.execute<ServiceDBType & RowDataPacket[]>(query, values)


            return rows as ServiceDBType
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<ServiceDBType[] | null> {
        try {
            const query = `SELECT * FROM tbl_servicos`

            const [rows] = await db.execute<ServiceDBType & RowDataPacket[]>(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServiceDBType[] : []

        } catch (error) {
            console.log(error);
            return null
        }
    },


    async get(id: string): Promise<ServiceDBType | null> {
        try {

            const query = `SELECT * FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<ServiceDBType & RowDataPacket[]>(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServiceDBType : null


        } catch (error) {
            console.log(error);
            return null
        }
    },

    async update(id: string, servicoAtualizado: ServiceDBType):Promise<ServiceDBType | null> {
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
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled_at,
                new Date(),
                id
            ]
            const [rows] = await db.execute<ServiceDBType & RowDataPacket[]>(query, values)

            return rows as ServiceDBType
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async delete(id: string): Promise<ServiceDBType | null> {
        try {

            const query = `DELETE  FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const rows: any = await db.execute<ServiceDBType & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows as ServiceDBType

        } catch (error) {
            console.log(error);
            return null
        }
    },

    async getAllServicoDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
        SELECT 
        s.id, 
        s.nome as servico_nome, 
        s.descricao as servico_descricao, 
        c.designacao as designacao_categoria,
        c.icone as icone_categoria,
        e.id as id_empresa,
        e.designacao as designacao_empresa,
        e.icone as icone_empresa,
        s.enabled
        FROM tbl_servicos s
        INNER JOIN tbl_categoria c ON c.id = s.id_categoria
        INNER JOIN tbl_prestacao_servico ps ON s.id = ps.id_servico
        INNER JOIN tbl_empresa e ON e.id = s.id_empresa
        WHERE s.enabled = true
        LIMIT ? OFFSET ?
        `

            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null

        } catch (error) {
            console.log(error);
            return null
        }
    }
}
