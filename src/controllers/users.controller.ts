import type { Request, Response } from "express";
import { createUser, getUserById, getUsers } from "../users.js";
import { UsersModel } from "../models/users.model.js";


export const UsersController = {

    // Criar utilizador
    async createUser(req: Request, res: Response) {
        const user = req.body;

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Campos obrigatórios em falta",
                data: null,
            });
        }

        console.log("Dados recebidos:", user);

        const insertUserResponse = await createUser(
            user.id,
            user.nome,
            user.numero_identidade,
            user.data_nascimento,
            user.email,
            user.password,
            user.telefone,
            user.pais,
            user.localidade,
            user.enebled,
            user.created_at,
            user.updated_at,
        );

        return res.status(200).json({
            status: "success",
            message: "Utilizador criado com sucesso!",
            data: insertUserResponse,
        });
    },

    // Buscar todos utilizadores
    async getAll(req: Request, res: Response) {
        const getUsersResponse = await getUsers();

        if (!getUsersResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizadores encontrados com sucesso!",
            data: getUsersResponse,
        });
    },

    // Buscar utilizador por ID
    async get(req: Request, res: Response) {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do utilizador é obrigatório",
                data: null,
            });
        }

        const getUserByIdResponse = await getUserById(id as string);

        if (!getUserByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso!",
            data: getUserByIdResponse,
        });
    }
};