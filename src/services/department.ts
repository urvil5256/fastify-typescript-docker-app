import { Department } from "../modals/department";
import db from "../plugins/database";

const getAllDepartment = async (req, resp) => {
  try {
    const { offset, limit, filter = "" } = req.query;

    const response: Department[] = await db("departments")
      .leftJoin(
        "organizations",
        "organizations.id",
        "departments.organization_id"
      )
      .select([
        "departments.*",
        "organizations.email",
        "organizations.organization_name",
      ])
      .limit(limit)
      .offset(offset)
      .where(function () {
        this.where(
          "departments.department_name",
          "like",
          `%${filter}%`
        ).orWhere("organizations.organization_name", "like", `%${filter}%`);
      })
      .then((row) => row);

    resp.code(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const createDepartment = async (req, resp) => {
  try {
    const departmentObject: Department = req.body;

    const organization = await db("departments")
      .select("id")
      .where("organization_id", departmentObject.organization_id)
      .andWhere("department_name", departmentObject.department_name)
      .first();

    if (!organization) {
      await db("departments").insert(departmentObject);
    }

    resp.code(200).send("Department Created Scusseccfully !!!");
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const deleteDepartment = async (req, resp) => {
  try {
    const { departmentId } = req.query;

    await db("departments")
      .delete("*")
      .where("departments.id", "=", departmentId)
      .then((row) => row);

    resp.code(200).send("Department deleted successfully!!!");
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const updateDepartmentDetails = async (req, resp) => {
  try {
    const departmentUpdateObj: Department = req.body;
    const { departmentId } = req.query;

    const hasDepartment = await db("departments")
      .select("*")
      .where("id", "=", departmentId)
      .first();

    if (!hasDepartment) throw new Error("Department not found!!!");

    const hasStringAsValue =
      Object.values(departmentUpdateObj).includes("string");

    if (!hasStringAsValue) {
      const updateData: Department = {
        ...hasDepartment,
        ...departmentUpdateObj,
      };
      await db("departments").update(updateData).where("id", "=", departmentId);
      resp.code(200).send("Departments updated successfully!!!");
    } else {
      resp.code(500).send("Please correct the data and try again");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

export {
  createDepartment,
  getAllDepartment,
  deleteDepartment,
  updateDepartmentDetails,
};
