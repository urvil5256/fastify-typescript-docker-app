import bcrypt from "bcrypt";
import { Role } from "../modals/role";
import { Users } from "../modals/user";
import db from "../plugins/database/index";

const createUserDetails = async (req, resp) => {
  try {
    const userObject: Users = req.body;

    if (
      !userObject.firstName ||
      !userObject.lastName ||
      !userObject.email ||
      !userObject.password ||
      !userObject.confirm_password ||
      !userObject.prefix
    ) {
      throw new Error("Fields are required");
    }

    if (
      userObject.password.toLowerCase() !==
      userObject.confirm_password.toLowerCase()
    ) {
      throw new Error("Passwords do not match");
    }

    const roles: Role = await db("roles")
      .select("*")
      .where("role_name", process.env.DEFAULT_ROLE)
      .first();

    if (roles) {
      await db("users").insert({
        ...userObject,
        role_id: roles.id,
        password: await bcrypt.hash(userObject.password, 10),
      });
    } else {
      await db("users").insert({
        ...userObject,
        password: await bcrypt.hash(userObject.password, 10),
      });
    }
    resp.code(200).send("User registered successfully!!! ");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw resp.code(500).send({ message: error.message });
    }
  }
};

const getUserDetails = async (req, resp) => {
  try {
    const { offset, limit, filter = "" } = req.query;

    const response: Users[] = await db("users")
      .leftJoin("roles", "users.role_id", "=", "roles.id")
      .select([
        "users.id",
        "users.firstName",
        "users.lastName",
        "users.email",
        "users.prefix",
        "users.created_at",
        "users.updated_at",
        { user_role: "roles.role_name" },
      ])
      .limit(limit)
      .offset(offset)
      .where(function () {
        this.where("users.firstName", "like", `%${filter}%`)
          .orWhere("users.lastName", "like", `%${filter}%`)
          .orWhere("users.email", "like", `%${filter}%`)
          .orWhere("roles.role_name", "like", `%${filter}%`);
      })
      .then((row) => row);

    resp.code(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const deleteUserDetails = async (req, resp) => {
  try {
    const { userId } = req.query;

    await db("users")
      .delete("*")
      .where("users.id", "=", userId)
      .then((row) => row);

    resp.code(200).send("User deleted successfully!!!");
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const updateUserDetails = async (req, resp) => {
  try {
    const userUpdateObj: Users = req.body;
    const { userId } = req.query;

    const hasUser = await db("users")
      .select("*")
      .where("id", "=", userId)
      .first();

    if (!hasUser) throw new Error("User not found!!!");
    const hasStringAsValue = Object.values(userUpdateObj).includes("string");
    const hasdefaultEmail =
      Object.values(userUpdateObj).includes("user@example.com");

    if (!hasStringAsValue && !hasdefaultEmail) {
      const updateData: Users = {
        ...hasUser,
        ...userUpdateObj,
      };
      await db("users").update(updateData).where("id", "=", userId);
      resp.code(200).send("Users updated successfully!!!");
    } else {
      resp.code(500).send("Please correct the data and try again");
    }
  } catch (error) {
    console.log("error :", error);
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

export {
  createUserDetails,
  deleteUserDetails,
  getUserDetails,
  updateUserDetails,
};
