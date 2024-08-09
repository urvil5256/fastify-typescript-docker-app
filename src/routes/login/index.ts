import { FastifyInstance } from "fastify";
import { registerUserSchema } from "../../schema/login";
import { registerUserDetails } from "../../services/login";

export const LoginRoutes = async (api: FastifyInstance) => {
  const schema = registerUserSchema;
  api.post("/register", { schema }, async (req, resp) => {
    try {
      const { body } = req;
      const result = await registerUserDetails(body, resp);
      resp.send(result);
    } catch (error) {
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while user registration:: ${error.message}`
        );
      }
    }
  });
};
