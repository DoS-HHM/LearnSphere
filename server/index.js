require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoute = require("./routes/User");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payments");
const courseRoute = require("./routes/Course");
const aiRoute = require("./routes/AI");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;

// Database and external service setup
database.connect();
cloudinaryConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/ai", aiRoute);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "LearnSphere API is up and running." });
});

app.listen(PORT, () => {
  console.log(`LearnSphere API running on port ${PORT}`);
});
