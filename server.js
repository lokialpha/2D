const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const twoDRouter = require("./routes/twoDRoutes");
require("dotenv").config();


//Server Intilize
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());

//To render image
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//testing route
app.get("/", (req,res) => {
    res.send("Server is working");
});


//Routes
app.use("/api/user", userRouter);
app.user("/api/blog",twoDRouter)


//Db connected
mongoose.connect("mongodb://localhost:27017/app").then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

