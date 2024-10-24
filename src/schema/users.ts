const userResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    prefix: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    user_role: { type: "string" },
  },
};

const requestBodySchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    confirm_password: { type: "string" },
    prefix: { type: "string" },
  },
};

const queryStringSchema = {
  type: "object",
  properties: {
    userId: {
      type: "string",
    },
  },
  required: ["userId"],
};

const allUserSchema = {
  tags: ["Users"],
  description: "Get User Details",
  querystring: {
    type: "object",
    properties: {
      offset: {
        type: "integer",
      },
      limit: {
        type: "integer",
      },
      filter: {
        type: "string",
      },
    },
    required: ["offset", "limit"],
  },
  response: {
    200: {
      type: "array",
      items: userResponseSchema,
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const createUserSchema = {
  tags: ["Users"],
  description: "Create User Details",
  response: {
    200: {
      type: "object",
      properties: { message: { type: "string" } },
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
  body: requestBodySchema,
};

const deleteUserSchema = {
  tags: ["Users"],
  description: "Delete User Details",
  security: [{ bearerAuth: [] }],
  querystring: queryStringSchema,
  response: {
    200: {
      type: "object",
      properties: { message: { type: "string" } },
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const updateUserSchema = {
  tags: ["Users"],
  description: "Update User Details",
  security: [{ bearerAuth: [] }],
  response: {
    200: userResponseSchema,
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
  querystring: queryStringSchema,
  body: {
    ...requestBodySchema,
    properties: {
      ...requestBodySchema.properties,
      role_id: { type: "string" },
    },
  },
};
export { allUserSchema, createUserSchema, deleteUserSchema, updateUserSchema };
