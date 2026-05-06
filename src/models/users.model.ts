import db from "../lib/db.js";
import { formatDateDDMMYYYY } from "../utils/data.js";
import { hashPassword } from "../utils/password.js";
import { generateUUID } from "../utils/uuid.js";
import type { UserDBType, userType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";

export const UsersModel = {

    async create(User: userType): Promise<UserDBType | null> {
       console.log({User})
       console.log( User.nome,
                    User.numero_identidade,
                    formatDateDDMMYYYY(User.data_nascimento),
                    User.email,
                    await hashPassword(User.password),
                    User.telefone,
                    User.pais,
                    User.localidade,
                    User.role || "cliente",
                    User.enebled ?? true,
                    new Date(),
                    new Date())
        try {

            const [rows] = await db.execute<UserDBType & RowDataPacket[]>(`
            INSERT INTO tbl_utilizadores
            (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, role, enebled, created_at, update_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    User.nome,
                    User.numero_identidade,
                    formatDateDDMMYYYY(User.data_nascimento),
                    User.email,
                    await hashPassword(User.password),
                    User.telefone,
                    User.pais,
                    User.localidade,
                    User.role || "cliente",
                    User.enebled ?? true,
                    new Date(),
                    new Date()
                ]
            )
            return rows as UserDBType;

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

    async get(id: string): Promise<UserDBType | null> {
        try {

            const query = `SELECT * FROM tbl_utilizadores WHERE id = ?`;

            const values = [id];

            const rows: any = await db.execute(query, values);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getById(id: string): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute<UserDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?`, [id]

            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getByEmail(email: string): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute
                (`SELECT * FROM tbl_utilizadores 
                WHERE email = ?`, [email]);
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as UserDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },





    // trabalho final..................................................
    //(ADICIONAR)

    async updatePassword(id: string, newPassword: string) {
        try {
            const query = `
        UPDATE tbl_utilizadores
        SET password = ?, update_at = ?
        WHERE id = ?
        `;
            const hasPassword = await hashPassword(newPassword);
            const values = [
                hasPassword,
                new Date(),
                id
            ];

            const rows: any = await db.execute(query, values);

            return rows[0]?.affectedRows === 0 ? null : rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async resetPassword(id: string, newPassword: string): Promise<UserDBType | null> {
        try {
            const query = "tbl_utilizadores SET password=?, updated_at=? WHERE id=?";

            const hasPassword = await hashPassword(newPassword)
            const value = [hasPassword, new Date(), id]

            //User se existe
            const [rows] = await db.execute<UserDBType[] & RowDataPacket[]>(query, value);
            return rows[0] as UserDBType;
        } catch (error) {
            return null
        }
    },

    async update(id: string, updatedUser: userType):Promise<UserDBType | null> {
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

            const [rows] = await db.execute<UserDBType & RowDataPacket[]>(query, values);

            return  rows as UserDBType;

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
