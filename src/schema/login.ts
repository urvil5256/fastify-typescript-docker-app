import { UserSchema } from "../modals";

const registerUserSchema = {
  tags: ["Login"],
  response: {
    200: UserSchema,
  },
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      prefix: { type: "string" },
    },
    required: ["firstName", "lastName", "email", "password", "prefix"],
  },
};

export { registerUserSchema };
