import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { OrganizationSchema } from "../../modals";
import getAllEmployee from "../../services/employeeService";

export const EmployeeRoute: FastifyPluginAsync = async (api) => {
  const schema = {
    tags: ["Employee"],
    sequrity: [{ apiKey: [] }],
    response: {
      200: OrganizationSchema,
    },
  };
  api.get("/employees", { schema }, async () => {
    try {
      return await getAllEmployee(api);
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
