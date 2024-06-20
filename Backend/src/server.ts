import express from "express";
import cors from "cors";

require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const app = express();
// frontend served on localhost:4200
// backend served on localhost:5000

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api", (req, res) => {
    res.send("Hello from the backend!");
});

app.get("/", (req, res) => {
    res.send();
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});

const mongoDBatlas = 'mongodb+srv://thomas:+++++++@testcluster.d6mjom5.mongodb.net/';
mongoose.connect(mongoDBatlas
    ).then(() => {
        console.log("Connected to the database!");
    }).catch((error: any) => {
        console.log("Connection failed!");
        console.log(error);
    });
