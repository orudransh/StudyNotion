// Importing necessary modules and packages
const express = require("express")
const app = express()

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database")
const cookieParser = require ("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { paymentSuccessEmail } = require("./mail/templates/paymentSuccessEmail");

dotenv.config();
// Setting up port number
const PORT = process.env.PORT || 4000;

//database connect 
database.connect();
//middlewares
app.use (express.json());
app.use (cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(
  fileUpload ({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
)

//Cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//Default Route
app.get("/", (req, res) => {
  return res.json({
    paymentSuccessEmail: true,
    message: "Your server is UP and Running..."
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`)
})

// End of code.