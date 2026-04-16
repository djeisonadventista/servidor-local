
import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { PropostaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PropostaModel = {
    async create(proposta: PropostaDBType): Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
                `INSERT INTO tbl_proposta 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PropostaDBType[] | null> {
        const [rows] = await db.execute("SELECT * FROM tbl_proposta")

        return rows as PropostaDBType[]
    },

    async get(id: string): Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
                `SELECT DISTINCT 
                pt.*,
                pr.id as ownwer
                FROM tbl_proposta pt
                INNER JOIN tbl_prestadores pr ON pt.id_prestador = pr.id
                INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                WHERE pt.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PropostaDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: PropostaDBType) {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_proposta
                SET id_prestacao_servico = ?, 
                preco_hora = ?, 
                horas_estimadas = ?, 
                estado = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    // trabalho final..................................................

    async aceitarProposta(id: string): Promise<PropostaDBType | null> {
        try {

            // 1. marcar proposta como aceite
            await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_proposta SET estado = 'Aceite' WHERE id = ?`,
                [id]
            );

            // 2. buscar proposta
            const [rows]: any = await db.execute<PropostaDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_proposta WHERE id = ?`,
                [id]
            );

            const proposta = rows[0];

            // 3. atualizar prestacao_servico
            await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_prestacao_servico 
             SET estado = 'Aceite'
             WHERE id = ?`,
                [proposta.id_prestacao_servico]
            );

            // 4. rejeitar restantes propostas
            await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_proposta 
             SET estado = 'Rejeitada'
             WHERE id_prestacao_servico = ? AND id != ?`,
                [proposta.id_prestacao_servico, id]
            );

            return null;

        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async delete(id: string): Promise<PropostaDBType | null> {
        try {
            const rows: any = await db.execute<PropostaDBType & RowDataPacket[]>(
                `DELETE FROM tbl_proposta 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0] as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    // trabalho final..................................................

    async getByPrestacaoServico(idPrestacaoServico: string): Promise<PropostaDBType[] | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_proposta 
                    WHERE tbl_proposta.id_prestacao_servico = ?`,
                [idPrestacaoServico]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PropostaDBType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async acceptProposal(id: string): Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_proposta 
                SET estado = 'ACEITE' 
                WHERE id = ?`,
                [id])
            return rows as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }

    }
}


