import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { authentication } from "../../plugins/jwt-authentication";
import {
  allRoleSchema,
  createRolesSchema,
  deleteRolesSchema,
  updateRoleSchema,
} from "../../schema/roles";
import {
  createRoles,
  deleteRoles,
  getRoleDetails,
  updateRoleDetails,
} from "../../services/role";

export const RoleRoute: FastifyPluginAsync = async (api) => {
  api.get(
    "/roles",
    { schema: allRoleSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await getRoleDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while fetching role:: ${error.message}`
          );
        }
      }
    }
  );

  api.post("/createRoles", { schema: createRolesSchema }, async (req, resp) => {
    try {
      await createRoles(req, resp);
    } catch (error) {
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while creating role:: ${error.message}`
        );
      }
    }
  });

  api.delete("/roles", { schema: deleteRolesSchema }, async (req, resp) => {
    try {
      await deleteRoles(req, resp);
    } catch (error) {
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while deleting role:: ${error.message}`
        );
      }
    }
  });

  api.put(
    "/updateRole",
    { schema: updateRoleSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await updateRoleDetails(req, resp);
      } catch (error) {
        console.log("error :", error);
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while updating role:: ${error.message}`
          );
        }
      }
    }
  );
};
