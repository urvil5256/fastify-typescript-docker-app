import { Role } from "../modals/role";
import { Users } from "../modals/user";
import db from "../plugins/database/index";
import { Roles } from "../utils/enums";

const registerUserDetails = async (req, resp) => {
  try {
    let newUser: Users;
    let {
      firstName,
      lastName,
      email,
      password,
      prefix,
      user_role,
      role_id,
    }: Users = req;

    if (!firstName || !lastName || !email || !password || !prefix) {
      throw new Error("Fields are required");
    }

    const roleId: Role = await db("roles")
      .select("*")
      .whereNot("role_name", "Admin")
      .first();

    if (!roleId.id) {
      return resp.status(404).send({ error: "Role not found" });
    }

    role_id = roleId.id;
    user_role = roleId.role_name as Roles;

    if (roleId && user_role === process.env.DEFAULT_ROLE) {
      newUser = resp.send(
        await db("users").insert({
          firstName,
          lastName,
          email,
          password,
          prefix,
          role_id,
          user_role,
        })
      );
    } else {
      newUser = resp.send(
        await db("users").insert({
          firstName,
          lastName,
          email,
          password,
          prefix,
        })
      );
    }
    return resp.send({ userId: newUser[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error handling request:", error);
      return new Error(error.message);
    }
  }
};

export { registerUserDetails };
