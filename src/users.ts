import db from "./lib/db.js";

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")
    return rows;
}

export async function getUserById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_utilizadores WHERE id = ? ", [id]);
        if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null;
}

export async function createUser(
    id: string,
    nome: string,
    numero_identidade: string,
    data_nascimento: string,
    email: string,
    password: string,
    telefone: string,
    pais: string,
    localidade: string,
    enebled: boolean,
    created_at: string,
    update_at: string
) {
try {

    const [rows] = await db.execute(
        `INSERT INTO tbl_utilizadores
        (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, enebled, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            nome,
            numero_identidade,
            data_nascimento,
            email,
            password,
            telefone,
            pais,
            localidade,
            enebled,
            new Date(),
            new Date()
        ]
    );

    console.log({rows})
    return rows
} catch (error) {
    console.log(error);
    return null;
}
}
