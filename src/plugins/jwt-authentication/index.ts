import jwt from "jsonwebtoken";

export const authentication = async (req, resp) => {
  const auth = req.headers.authorization;

  if (!auth) {
    resp.code(401).send({ message: "Unauthorized !!!" });
  }

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET);
};
