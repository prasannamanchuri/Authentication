import { Master } from "./app/Models/index.js";

Master.sync()
  .then(() => console.log(`Master table created!`))
  .catch((e) => console.log(e));
