import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../modals/user";
import db from "../plugins/database/index";

const loginUser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and passowrd are required");
    }

    const usersDetails: Users = await db("users")
      .select("*")
      .where("email", "=", email)
      .first();

    if (!usersDetails) {
      throw new Error("User not found");
    }

    const dycriptPassword = await bcrypt.compare(
      password,
      usersDetails.password
    );

    if (!dycriptPassword) {
      throw new Error("Invalid Email and passowrd");
    }

    resp.code(200).send({
      token: jwt.sign({ user: usersDetails.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw resp.code(500).send({ message: error.message });
    }
  }
};

export { loginUser };
