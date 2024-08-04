import {} from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";
import getAllUsers from "../../services/user";

export const UserRoute: FastifyPluginAsync = async (api) => {
  const schema = {
    tags: ["Users"],
    sequrity: [{ apiKey: [] }],
    // response: {
    //   200: {
    //     type: "array",
    //     properties: {
    //       type: "object",
    //       UserSchema: {
    //         id: { type: "string" },
    //       },
    //     },
    //   },
    // },
  };
  api.get("/users", { schema }, async () => {
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
