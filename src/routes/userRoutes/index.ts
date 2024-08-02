import { UserSchema } from "../../modals";
import getAllUsers from "../../services/userService";

export const UserRoute = async (api) => {
  const schema = {
    tags: ["Users"],
    sequrity: [{ apiKey: [] }],
    response: {
      200: UserSchema,
    },
  };
  await api.get("/users", { schema }, async () => {
    try {
      return await getAllUsers(api);
    } catch (error: any) {
      api.log.error("Error::", error);
      if (error instanceof Error) {
        throw api.httpErrors.internalServerError(
          `Error while fetching sections:: ${error.message}`
        );
      }
      throw error;
    }
  });
};
