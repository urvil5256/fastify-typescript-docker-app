import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { authentication } from "../../plugins/jwt-authentication";
import {
  createDepartmentSchema,
  deleteDepartmentSchema,
  departmentSchema,
  updateDepartmentSchema,
} from "../../schema/department";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartment,
  updateDepartmentDetails,
} from "../../services/department";

export const DepartmentRoute: FastifyPluginAsync = async (api) => {
  api.get(
    "/departments",
    { schema: departmentSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await getAllDepartment(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while fetching department:: ${error.message}`
          );
        }
      }
    }
  );

  api.post(
    "/createDepartments",
    { schema: createDepartmentSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await createDepartment(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while creating department:: ${error.message}`
          );
        }
      }
    }
  );

  api.delete(
    "/deleteDepartment",
    { schema: deleteDepartmentSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await deleteDepartment(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while deleting department:: ${error.message}`
          );
        }
      }
    }
  );

  api.put(
    "/updateDepartment",
    { schema: updateDepartmentSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await updateDepartmentDetails(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while updating role:: ${error.message}`
          );
        }
      }
    }
  );
};
