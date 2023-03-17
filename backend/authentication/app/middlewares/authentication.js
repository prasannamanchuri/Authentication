import { JWT_SECRET } from "../../Constants.js";
import jwt from "jsonwebtoken";

export const AUTHENTICATE = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.id = decoded.id;
    req.name = decoded.name;
    req.email = decoded.email;
    next();
  } catch (error) {
    console.log({ message: "Authentication Required. Please Login Again" });
    res
      .status(401)
      .send({ message: "Authentication Required. Please Login Again" });
  }
};
