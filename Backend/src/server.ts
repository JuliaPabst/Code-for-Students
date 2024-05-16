import express from "express";
import cors from "cors";

const app = express();
// frontend served on localhost:4200
// backend served on localhost:5000

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api", (req, res) => {
    res.send("Hello from the backend!");
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});