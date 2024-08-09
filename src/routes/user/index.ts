import { FastifyPluginAsync } from "fastify";
import { getAllUsers, getUserById } from "../../services/user";
import { UserSchema } from "../../modals";

export const UserRoute: FastifyPluginAsync = async (api) => {
  const schema = {
    tags: ["Users"],
    response: {
      200: UserSchema,
    },
  };
  api.get("/users", { schema }, async () => {
    try {
      return await getAllUsers();
    } catch (error: any) {
      api.log.error("Error::", error);
      if (error instanceof Error) {
        console.log("catch :", error);
        throw api.httpErrors.internalServerError(
          `Error while fetching sections:: ${error.message}`
        );
      }
      throw error;
    }
  });

  api.get("/users/:id", { schema }, async (req) => {
    try {
      return await getUserById(req);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("catch :", error);
        throw api.httpErrors.internalServerError(
          `Error while fetching sections:: ${error.message}`
        );
      }
    }
  });
};
