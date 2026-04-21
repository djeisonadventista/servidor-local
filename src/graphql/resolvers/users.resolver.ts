
import {UsersModel} from "../../models/users.model.js";
import type { UserDBType } from "../../utils/types.js";

export const usersResolver = {
    Query: {
        getAllUsers: async () => {
            return await UsersModel.getAll();
        },

        getUserById: async (_: any, args: { id: string }) => {
            return await UsersModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { user: UserDBType }) => {
            return await UsersModel.create(args.user);
        },
        updateUser: async (_: any, args: { id: string, user: UserDBType }) => {
            return await UsersModel.update(args.id, args.user);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await UsersModel.delete(args.id);
        }
    }
}
