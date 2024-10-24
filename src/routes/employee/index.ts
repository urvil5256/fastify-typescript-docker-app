import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import { authentication } from "../../plugins/jwt-authentication";
import {
  createEmployeeSchema,
  deleteEmployeeSchema,
  employeeSchema,
  updateEmployeeSchema,
} from "../../schema/employee";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from "../../services/employee";

export const EmployeeRoute: FastifyPluginAsync = async (api) => {
  api.get(
    "/employees",
    { schema: employeeSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await getAllEmployee(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while fetching employee:: ${error.message}`
          );
        }
      }
    }
  );

  api.post(
    "/createEmployees",
    { schema: createEmployeeSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await createEmployee(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while creating employee:: ${error.message}`
          );
        }
      }
    }
  );

  api.delete(
    "/deleteEmployee",
    { schema: deleteEmployeeSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await deleteEmployee(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while deleting employee:: ${error.message}`
          );
        }
      }
    }
  );

  api.put(
    "/updateEmployee",
    { schema: updateEmployeeSchema, preHandler: authentication },
    async (req, resp) => {
      try {
        await updateEmployee(req, resp);
      } catch (error) {
        if (error instanceof Error) {
          throw api.httpErrors.internalServerError(
            `Error while updating employee:: ${error.message}`
          );
        }
      }
    }
  );
};
