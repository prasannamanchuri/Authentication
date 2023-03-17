import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Demo", "root", "Manchu@12", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((response) => {
    console.log(`Database connected successfully!!`);
  })
  .catch((e) => console.log(e));
export default sequelize;
