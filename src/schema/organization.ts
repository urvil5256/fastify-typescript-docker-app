const organizationResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    organization_name: { type: "string" },
    description: { type: "string" },
    address: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
    postal_code: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", format: "email" },
  },
};

const createOrganizationSchema = {
  type: "object",
  properties: {
    organization_name: { type: "string" },
    description: { type: "string" },
    address: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    country: { type: "string" },
    postal_code: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", format: "email" },
  },
};

const organizationsSchema = {
  tags: ["Organizations"],
  description: "Get Organization Details",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      offset: {
        type: "string",
      },
      limit: {
        type: "string",
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
      items: organizationResponseSchema,
    },
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const queryStringSchema = {
  type: "object",
  properties: {
    organizationId: {
      type: "string",
    },
  },
  required: ["organizationId"],
};

const createOrganizationsSchema = {
  tags: ["Organizations"],
  description: "Create Organization Details",
  security: [{ bearerAuth: [] }],
  body: createOrganizationSchema,
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

const deleteOrganizationSchema = {
  tags: ["Organizations"],
  description: "Delete Organization Details",
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

const updateOrganizationSchema = {
  tags: ["Organizations"],
  description: "Update Organization Details",
  security: [{ bearerAuth: [] }],
  response: {
    200: organizationResponseSchema,
    500: {
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
  querystring: queryStringSchema,
  body: createOrganizationSchema,
};

export {
  deleteOrganizationSchema,
  organizationsSchema,
  createOrganizationsSchema,
  updateOrganizationSchema,
};
