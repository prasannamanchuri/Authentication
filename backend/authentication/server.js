import express from "express";
import appRouter from "./app/routes/authRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors("*"));

app.use(express.json());

app.use("/api", appRouter);

app.listen(PORT || 5000, () => console.log(`App started on port ${PORT}`));
