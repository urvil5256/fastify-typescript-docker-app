import { Employee } from "../modals/employee/index";
import db from "../plugins/database/index";

const getAllEmployee = async (req, resp) => {
  try {
    const { offset, limit, filter = "" } = req.query;

    const response: Employee[] = await db("employees")
      .leftJoin("departments", "departments.id", "employees.department_id")
      .select(["employees.*", "departments.department_name"])
      .limit(limit)
      .offset(offset)
      .where(function () {
        this.where("employees.employee_name", "like", `%${filter}%`)
          .orWhere("employees.email", "like", `%${filter}%`)
          .orWhere("departments.department_name", "like", `%${filter}%`);
      })
      .then((row) => row);

    resp.code(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const createEmployee = async (req, resp) => {
  try {
    const employeeObject: Employee = req.body;
    let response;

    const hasStringAsValue = Object.values(employeeObject).includes("string");
    const hasdefaultEmail =
      Object.values(employeeObject).includes("user@example.com");

    const department = await db("employees")
      .select("id")
      .where("department_id", employeeObject.department_id)
      .andWhere("employee_name", employeeObject.employee_name)
      .andWhere("email", employeeObject.email)
      .first();

    if (!department) {
      if (!hasStringAsValue && !hasdefaultEmail) {
        await db("employees").insert(employeeObject);
        response = "Employee Created Scusseccfully !!!";
      } else {
        response = "Please correct the data and try again";
      }
    }

    resp.code(200).send({ message: response });
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const deleteEmployee = async (req, resp) => {
  try {
    const { employeeId } = req.query;

    await db("employees")
      .delete("*")
      .where("employees.id", "=", employeeId)
      .then((row) => row);

    resp.code(200).send("Employee deleted successfully!!!");
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const updateEmployee = async (req, resp) => {
  try {
    const employeeUpdateObj: Employee = req.body;
    const { employeeId } = req.query;
    console.log("employeeId :", employeeId);

    const hasEmployee = await db("employees")
      .select("*")
      .where("id", "=", employeeId)
      .first();

    if (!hasEmployee) throw new Error("Employee not found!!!");

    const hasStringAsValue =
      Object.values(employeeUpdateObj).includes("string");

    if (!hasStringAsValue) {
      const updateData: Employee = {
        ...hasEmployee,
        ...employeeUpdateObj,
      };

      await db("employees").update(updateData).where("id", "=", employeeId);
      resp.code(200).send("Employee updated successfully!!!");
    } else {
      resp.code(500).send("Please correct the data and try again");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

export { createEmployee, deleteEmployee, getAllEmployee, updateEmployee };
