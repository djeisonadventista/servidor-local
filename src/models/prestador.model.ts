import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { PrestadorDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestadorModel = {
    async create(prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(
                `INSERT INTO tbl_prestadores 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    prestador.taxa_urgencia,
                    prestador.percentagem_desconto,
                    prestador.minimo_desconto,
                    prestador.nif,
                    prestador.profissao,
                    prestador.enable,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows as PrestadorDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PrestadorDBType[] | null> {
        const [rows] = await db.execute<PrestadorDBType[] & RowDataPacket[]>("SELECT * FROM tbl_prestadores")

        return rows as PrestadorDBType[]
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_prestadores 
                WHERE tbl_prestadores.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestadorDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(
                `UPDATE tbl_prestadores 
                SET taxa_urgencia = ?, 
                percentagem_desconto = ?, 
                minimo_desconto = ?, 
                nif = ?, 
                profissao = ?, 
                enable = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestador.taxa_urgencia,
                    prestador.percentagem_desconto,
                    prestador.minimo_desconto,
                    prestador.nif,
                    prestador.profissao,
                    prestador.enable,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows as PrestadorDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<PrestadorDBType | null> {
        try {
            const rows: any = await db.execute<PrestadorDBType & RowDataPacket[]>(
                `DELETE FROM tbl_prestadores 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0] as PrestadorDBType
        } catch (err) {
            console.log(err)
            return null
        }
    }
}