const roleResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    role_name: { type: "string" },
    description: { type: "string" },
  },
};

const queryStringSchema = {
  type: "object",
  properties: {
    roleId: {
      type: "string",
    },
  },
};

const allRoleSchema = {
  tags: ["Roles"],
  description: "Get Role Details",
  security: [{ bearerAuth: [] }],
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
      items: roleResponseSchema,
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const createRolesSchema = {
  tags: ["Roles"],
  description: "Create Role Details",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      role_name: { type: "string" },
      description: { type: "string" },
    },
    required: ["role_name"],
  },
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

const deleteRolesSchema = {
  tags: ["Roles"],
  description: "Delete role Details",
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

const updateRoleSchema = {
  tags: ["Roles"],
  description: "Update Role Details",
  security: [{ bearerAuth: [] }],
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
  querystring: queryStringSchema,
  body: {
    type: "object",
    properties: {
      role_name: { type: "string" },
      description: { type: "string" },
    },
  },
};

export {
  allRoleSchema,
  createRolesSchema,
  deleteRolesSchema,
  updateRoleSchema,
};
