import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { RoleSchema } from "../../modals";
import getAllRoles from "../../services/rolesService";

export const RoleRoute: FastifyPluginAsync = async (api) => {
  const schema = {
    tags: ["Roles"],
    sequrity: [{ apiKey: [] }],
    response: {
      200: RoleSchema,
    },
  };
  api.get("/roles", { schema }, async () => {
    try {
      return await getAllRoles(api);
    } catch (error) {
      api.log.error("Error::", error);
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while fetching sections:: ${error.message}`
        );
      }
      throw error;
    }
  });
};
