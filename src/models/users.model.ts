import db from "../lib/db.js";
import { formatDateDDMMYYYY } from "../utils/data.js";
import { hashPassword } from "../utils/password.js";
import { generateUUID } from "../utils/uuid.js";
import type { userType } from "../utils/types.js";

export const UsersModel = {

    async create(newUser: userType) {
        try {

            const query = `
            INSERT INTO tbl_utilizadores
            (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, enebled, created_at, update_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                generateUUID(),
                newUser.nome,
                newUser.numero_identidade,
                formatDateDDMMYYYY(newUser.data_nascimento),
                newUser.email,
                await hashPassword(newUser.password),
                newUser.telefone,
                newUser.pais,
                newUser.localidade,
                newUser.enebled,
                new Date(),
                new Date()
            ];

            const rows = await db.execute(query, values);

            return rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {

            const query = `SELECT * FROM tbl_utilizadores`;

            const rows = await db.execute(query);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {

            const query = `SELECT * FROM tbl_utilizadores WHERE id = ?`;

            const values = [id];

            const rows = await db.execute(query, values);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedUser: userType) {
        try {

            const query = `
            UPDATE tbl_utilizadores
            SET
                nome = ?,
                numero_identidade = ?,
                data_nascimento = ?,
                email = ?,
                password = ?,
                telefone = ?,
                pais = ?,
                localidade = ?,
                enebled = ?,
                update_at = ?
            WHERE id = ?
            `;

            const values = [
                updatedUser.nome,
                updatedUser.numero_identidade,
                formatDateDDMMYYYY(updatedUser.data_nascimento),
                updatedUser.email,
                await hashPassword(updatedUser.password),
                updatedUser.telefone,
                updatedUser.pais,
                updatedUser.localidade,
                updatedUser.enebled,
                new Date(),
                id
            ];

            const rows = await db.execute(query, values);

            return rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string) {
        try {

            const query = `DELETE FROM tbl_utilizadores WHERE id = ?`;

            const values = [id];

            const rows: any = await db.execute(query, values);

            return rows[0]?.affectedRows === 0 ? null : rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
};