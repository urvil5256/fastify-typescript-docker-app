const loginUserSchema = {
  tags: ["Login"],
  description: "Login user",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: { token: { type: "string" } },
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
};

export { loginUserSchema };
