import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { authentication } from "../../plugins/jwt-authentication";
import {
  allUserSchema,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "../../schema/users";
import {
  createUserDetails,
  deleteUserDetails,
  getUserDetails,
  updateUserDetails,
} from "../../services/user";

export const UserRoute: FastifyPluginAsync = async (api) => {
  api.post("/createUser", { schema: createUserSchema }, async (req, resp) => {
    try {
      await createUserDetails(req, resp);
    } catch (error) {
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while creating user:: ${error.message}`
        );
      }
    }
  });

  api.get(
    "/users",
    { schema: allUserSchema, preHandler: authentication },
    async (req: FastifyRequest, resp: FastifyReply) => {
      try {
        await getUserDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while fetching users:: ${error.message}`
          );
        }
      }
    }
  );

  api.delete(
    "/deleteUser",
    { schema: deleteUserSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await deleteUserDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while deleting users:: ${error.message}`
          );
        }
      }
    }
  );

  api.put(
    "/updateUser",
    { schema: updateUserSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await updateUserDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while updating users:: ${error.message}`
          );
        }
      }
    }
  );
};
