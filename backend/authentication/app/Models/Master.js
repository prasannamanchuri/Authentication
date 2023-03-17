import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import bcryptjs from "bcryptjs";

const Master = sequelize.define(
  "master",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        if (value) {
          const salt = bcryptjs.genSaltSync(10);
          const hashedPassword = bcryptjs.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        } else {
          this.setDataValue("password", null);
        }
      },
    },
  },
  {}
);

export default Master;
