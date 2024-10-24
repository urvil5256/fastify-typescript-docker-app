import { FastifyInstance } from "fastify";
import { loginUserSchema } from "../../schema/login";
import { loginUser } from "../../services/login";

export const LoginRoutes = async (api: FastifyInstance) => {
  api.post("/login", { schema: loginUserSchema }, async (req, resp) => {
    try {
      await loginUser(req, resp);
    } catch (error) {
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while user login:: ${error.message}`
        );
      }
    }
  });
};
