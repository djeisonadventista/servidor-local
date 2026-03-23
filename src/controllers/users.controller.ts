import type { Request, Response } from "express";
import { createUser, getUserById, getUsers } from "../users.js";
import { UsersModel } from "../models/users.model.js";
import type { userType } from "../utils/types.js";


export const UsersController = {

    // Criar utilizador
    async create(req: Request, res: Response) {
        try {
            const user = req.body;

            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Campos obrigatórios em falta",
                    data: null,
                });
            }

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
                user.enabled, // corrigido
                user.created_at,
                user.updated_at,
            );

            return res.status(201).json({
                status: "success",
                message: "Utilizador criado com sucesso!",
                data: insertUserResponse,
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno ao criar utilizador",
                data: error,
            });
        }
    },

    // Buscar todos utilizadores
    async getAll(req: Request, res: Response) {
        try {
            const getUsersResponse = await getUsers();

            return res.status(200).json({
                status: "success",
                message: "Utilizadores encontrados com sucesso!",
                data: getUsersResponse,
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: error,
            });
        }
    },

    // Buscar utilizador por ID
    async getById(req: Request, res: Response) {
        
        try {
            const { id } = req.params;

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

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno",
                data: error,
            });
        }
    },

    // Atualizar utilizador
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedUser: userType = req.body;

            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID é obrigatório",
                    data: null,
                });
            }

            if (!updatedUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados inválidos",
                    data: null,
                });
            }

            const updateUserResponse = await UsersModel.update(id as string, updatedUser);

            if (!updateUserResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar utilizador",
                    data: null,
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Utilizador atualizado com sucesso",
                data: updateUserResponse
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno",
                data: error,
            });
        }
    },

    // Apagar utilizador
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatório",
                    data: null,
                });
            }

            const deleteUserResponse = await UsersModel.delete(id as string);

            if (!deleteUserResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao apagar utilizador",
                    data: null,
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Utilizador apagado com sucesso",
                data: deleteUserResponse
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno",
                data: error,
            });
        }
    }
};