
import db from "../lib/db.js"
import type { PropostaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PropostaModel = {
    async create(proposta: PropostaDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_propostas 
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
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_propostas")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_propostas 
                WHERE tbl_propostas.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: PropostaDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_propostas 
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
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_propostas 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}
