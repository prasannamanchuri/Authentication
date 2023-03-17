import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Constants.js";
import { Master } from "../Models/index.js";

const appController = {};

/**
 *
 * @param {name,email,password} req
 * @param {*} res
 */
appController.register = async (req, res) => {
  const { name, email, password } = req.body;
  await Master.create({ name, email, password })
    .then((response) => {
      res
        .status(201)
        .send({ message: "Data created successfully.", data: response });
    })
    .catch((e) => {
      if (e.name === `SequelizeUniqueConstraintError`) {
        res.status(200).send({ message: "Duplicate email exists.", error: {} });
      } else {
        console.log(e);
        res.status(500).send({ message: "Unable to create data.", error: e });
      }
    });
};
/**
 *
 * @param {email,password} req
 * @param {*} res
 */
appController.login = async (req, res) => {
  const { email, password } = req.body;
  await Master.findOne({
    where: { email },
    attributes: ["id", "name", "email", ["password", "hashedpassword"]],
  })
    .then((response) => {
      if (response) {
        const { id, name, email, hashedpassword } = response.toJSON();
        const passwordMatched = bcryptjs.compareSync(
          password ?? "",
          hashedpassword ?? ""
        );
        if (passwordMatched) {
          const jwtToken = jwt.sign(
            {
              id,
              name,
              email,
            },
            JWT_SECRET,
            {
              expiresIn: "2d",
            }
          );
          res.status(200).send({ message: "", token: jwtToken, status: 1 });

        } else {
          res.status(200).send({ message: "Wrong Credentials", token: {}, status: 0 });
        }
      } else {
        res.status(200).send({ message: "User not registered.", token: {}, status: 0 });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: "Unable to login", error: e, status: 0 });
    });
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
appController.profile = async (req, res) => {
  await Master.findOne({
    where: { email: req.email },
    attributes: ["name", "email"],
  })
    .then((response) => {
      if (response) {
        res.send({ message: "", data: response });
      } else {
        res.send({ message: "User not found", data: {} });
      }
    })
    .catch((error) => {
      res.send({ error });
    });
};
export default appController;
