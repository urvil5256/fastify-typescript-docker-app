const departmentResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    department_name: { types: "string" },
    organization_id: { types: "string" },
    organization_name: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    email: { type: "string", format: "email" },
  },
};

const requestBodySchema = {
  type: "object",
  properties: {
    department_name: { type: "string" },
    organization_id: { type: "string" },
  },
  required: ["department_name"],
};

const queryStringSchema = {
  type: "object",
  properties: {
    departmentId: {
      type: "string",
    },
  },
  required: ["departmentId"],
};

const departmentSchema = {
  tags: ["Departments"],
  description: "Get Department Details",
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
      items: departmentResponseSchema,
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const deleteDepartmentSchema = {
  tags: ["Departments"],
  description: "Delete Department Details",
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
};

const createDepartmentSchema = {
  tags: ["Departments"],
  description: "Create Department Details",
  security: [{ bearerAuth: [] }],
  body: requestBodySchema,
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

const updateDepartmentSchema = {
  tags: ["Departments"],
  description: "Update Department Details",
  security: [{ bearerAuth: [] }],
  response: {
    200: departmentResponseSchema,
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
  querystring: queryStringSchema,
  body: requestBodySchema,
};

export {
  deleteDepartmentSchema,
  departmentSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
};
