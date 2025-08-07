const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
