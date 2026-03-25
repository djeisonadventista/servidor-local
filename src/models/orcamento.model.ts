import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_orcamento
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
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
        const [rows] = await db.execute("SELECT * FROM tbl_orcamento")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_orcamento 
                WHERE tbl_orcamento.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_orcamento 
                SET total = ?, 
                id_utilizadores = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
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
                `DELETE FROM tbl_orcamento
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


