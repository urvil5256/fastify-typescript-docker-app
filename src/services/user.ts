import db from "../plugins/database/index";

const getAllUsers = async () => {
  const response = await db({ user: "users", role: "roles" }).select({
    user: "user.*",
    user_role: "role.role_name",
  });
  return response;
};

const getUserById = async (req) => {
  const { id } = req.params;
  const response = await db({ user: "users", role: "roles" })
    .select({ user: "user.*", user_role: "role.role_name" })
    .where("id", id);
  return response;
};

export { getAllUsers, getUserById };
