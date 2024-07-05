// npm install @reduxjs/toolkit bcrypt bcryptjs body-parser cookie cookie-parser cors dotenv express express-async-handler jsonwebtoken mongoose nodemon parser react-redux
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/databaseConnection")
const studentModel = require("./models/studentModel")
const errorMiddleware = require("./middleware/errorMiddleware");
const route = require("./routes/StudentRoute")



const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND = process.env.FRONTEND;
const PORT = process.env.PORT || 3000;

var corsOptions = {
    origin: FRONTEND, //multiple access ['http://example.com', 'www.facebook.com']
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await studentModel.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "1d",
            // expiresIn: "1hr",
            //expiresIn: "15m",
        });

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ status: "notlogin" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});





app.post("/api/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        studentModel
            .findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});


app.use(errorMiddleware);
mongoose.set("strictQuery", false);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/api", route)   