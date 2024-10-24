const employeeResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    employee_name: { types: "string" },
    department_id: { types: "string" },
    salary: { type: "string" },
    address: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
    postal_code: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

const requestBodySchema = {
  type: "object",
  properties: {
    employee_name: { type: "string" },
    department_id: { type: "string" },
    salary: { type: "string" },
    address: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
    postal_code: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", format: "email" },
  },
};

const queryStringSchema = {
  type: "object",
  properties: {
    employeeId: {
      type: "string",
    },
  },
  required: ["employeeId"],
};

const employeeSchema = {
  tags: ["Employees"],
  description: "Get Employee Details",
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
      items: employeeResponseSchema,
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const deleteEmployeeSchema = {
  tags: ["Employees"],
  description: "Delete Employee Details",
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

const createEmployeeSchema = {
  tags: ["Employees"],
  description: "Create Employee Details",
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

const updateEmployeeSchema = {
  tags: ["Employees"],
  description: "Update Employee Details",
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
  body: requestBodySchema,
};

export {
  createEmployeeSchema,
  deleteEmployeeSchema,
  employeeSchema,
  updateEmployeeSchema,
};
