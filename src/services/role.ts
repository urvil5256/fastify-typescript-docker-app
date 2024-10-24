import { Role } from "../modals/role";
import db from "../plugins/database/index";

const getRoleDetails = async (req, resp) => {
  try {
    const { offset, limit, filter = "" } = req.query;

    const response: Role[] = await db("roles")
      .select("*")
      .limit(limit)
      .offset(offset)
      .where(function () {
        this.where("roles.role_name", "like", `%${filter}%`);
      })
      .then((row) => row);

    resp.code(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const createRoles = async (req, resp) => {
  try {
    const roleObject: Role = req.body;
    let response;

    const capitalizedRoleName =
      roleObject.role_name.charAt(0).toUpperCase() +
      roleObject.role_name.slice(1);

    const hasStringAsValue = Object.values(roleObject).includes("string");

    if (!hasStringAsValue) {
      const roles = { ...roleObject, role_name: capitalizedRoleName };

      await db("roles").insert(roles);
      response = "Role created successfully!!!";
    } else {
      response = "Please correct the data and try again";
    }

    resp.code(200).send({ message: response });
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send({ message: error.message });
    }
  }
};

const deleteRoles = async (req, resp) => {
  try {
    const { roleId } = req.query;

    await db("roles")
      .delete("*")
      .where("roles.id", "=", roleId)
      .then((row) => row);

    resp.code(200).send({ message: "Roles deleted successfully!!!" });
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const updateRoleDetails = async (req, resp) => {
  try {
    const roleUpdateObj: Role = req.body;
    const { roleId } = req.query;

    const hasRole = await db("roles")
      .select("*")
      .where("id", "=", roleId)
      .first();
    console.log("hasRole :", hasRole);

    if (!hasRole) throw new Error("Roles not found!!!");

    const hasStringAsValue = Object.values(roleUpdateObj).includes("string");

    if (!hasStringAsValue) {
      const updateData: Role = {
        ...hasRole,
        ...roleUpdateObj,
      };
      console.log("updateData :", updateData);
      await db("roles").update(updateData).where("id", "=", roleId);
      resp.code(200).send("Roles updated successfully!!!");
    } else {
      resp.code(500).send("Please correct the data and try again");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

export { createRoles, deleteRoles, getRoleDetails, updateRoleDetails };
