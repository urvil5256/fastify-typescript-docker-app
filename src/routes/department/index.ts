import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { OrganizationSchema } from "../../modals";
import getAllDepartment from "../../services/department";

export const DepartmentRoute: FastifyPluginAsync = async (api) => {
  const schema = {
    tags: ["Department"],
    sequrity: [{ apiKey: [] }],
    response: {
      200: OrganizationSchema,
    },
  };
  api.get("/departments", { schema }, async () => {
    try {
      return await getAllDepartment(api);
    } catch (error) {
      api.log.error("Error::", error);
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while fetching sections:: ${error.message}`,
        );
      }
      throw error;
    }
  });
};
