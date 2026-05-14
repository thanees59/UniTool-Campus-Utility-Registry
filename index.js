import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import itemRoutes from "./routes/itemRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/items", itemRoutes);
app.use("/api/borrow", borrowRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});