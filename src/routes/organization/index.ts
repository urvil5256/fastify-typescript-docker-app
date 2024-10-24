import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { authentication } from "../../plugins/jwt-authentication";
import {
  createOrganizationsSchema,
  deleteOrganizationSchema,
  organizationsSchema,
  updateOrganizationSchema,
} from "../../schema/organization";
import {
  createOrganizations,
  deleteOrganizationDetails,
  getAllOrganizations,
  updateOrganizationDetails,
} from "../../services/organization";

export const OrganizationRoute: FastifyPluginAsync = async (api) => {
  api.get(
    "/organizations",
    { schema: organizationsSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await getAllOrganizations(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while fetching organization details:: ${error.message}`
          );
        }
      }
    }
  );

  api.post(
    "/createOrganizations",
    { schema: createOrganizationsSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await createOrganizations(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while creating organization:: ${error.message}`
          );
        }
      }
    }
  );

  api.delete(
    "/deleteOrganizations",
    { schema: deleteOrganizationSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await deleteOrganizationDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while deleting organization:: ${error.message}`
          );
        }
      }
    }
  );

  api.put(
    "/updateOrganizations",
    { schema: updateOrganizationSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await updateOrganizationDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while updating organization:: ${error.message}`
          );
        }
      }
    }
  );
};
