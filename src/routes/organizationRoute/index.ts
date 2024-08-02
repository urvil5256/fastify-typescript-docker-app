import { OrganizationSchema } from "../../modals";
import getAllOrganizations from "../../services/organizationService";

export const OrganizationRoute = async (api) => {
  const schema = {
    tags: ["Organization"],
    sequrity: [{ apiKey: [] }],
    response: {
      200: OrganizationSchema,
    },
  };
  api.get("/organizations", { schema }, async () => {
    try {
      return await getAllOrganizations(api);
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
