import { Organization } from "../modals/organization";
import db from "../plugins/database/index";

const getAllOrganizations = async (req, resp) => {
  try {
    const { offset, limit, filter = "" } = req.query;

    const response: Organization[] = await db("organizations")
      .select("*")
      .limit(limit)
      .offset(offset)
      .where(function () {
        this.where(
          "organizations.organization_name",
          "like",
          `%${filter}%`
        ).orWhere("organizations.email", "like", `%${filter}%`);
      })
      .then((row) => row);

    resp.code(200).send(response);
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const createOrganizations = async (req, resp) => {
  try {
    const organizationObject: Organization = req.body;
    let response;

    const hasStringAsValue =
      Object.values(organizationObject).includes("string");
    const hasdefaultEmail =
      Object.values(organizationObject).includes("user@example.com");

    if (!hasStringAsValue && !hasdefaultEmail) {
      await db("organizations").insert(organizationObject);
      response = "Organizations created successfully";
    } else {
      response = "Please correct the data and try again";
    }
    resp.code(200).send({ message: response });
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send({ message: error.message });
    }
  }
};

const deleteOrganizationDetails = async (req, resp) => {
  try {
    const { organizationId } = req.query;

    await db("organizations")
      .delete("*")
      .where("organizations.id", "=", organizationId)
      .then((row) => row);

    resp.code(200).send("Organization deleted successfully!!!");
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

const updateOrganizationDetails = async (req, resp) => {
  try {
    const organizationUpdateObj: Organization = req.body;
    const { organizationId } = req.query;

    const hasOrganization = await db("organizations")
      .select("*")
      .where("id", "=", organizationId)
      .first();

    if (!hasOrganization) throw new Error("Organizations not found!!!");

    const hasStringAsValue = Object.values(organizationUpdateObj).includes(
      "string"
    );
    const hasdefaultEmail = Object.values(organizationUpdateObj).includes(
      "user@example.com"
    );

    if (!hasStringAsValue && !hasdefaultEmail) {
      const updateData: Organization = {
        ...hasOrganization,
        ...organizationUpdateObj,
      };
      await db("organizations")
        .update(updateData)
        .where("id", "=", organizationId);
      resp.code(200).send("Organizations updated successfully!!!");
    } else {
      resp.code(500).send("Please correct the data and try again");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw resp.code(500).send(error.message);
    }
  }
};

export {
  createOrganizations,
  deleteOrganizationDetails,
  getAllOrganizations,
  updateOrganizationDetails,
};
