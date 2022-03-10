const express = require("express");
const userRouter = require("./users/routes");
const authRouter = require("./auth/routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/error", (req, res) => {
  throw new Error("Error from server");
});

dotenv.config();

console.log(process.env.jwt_SECRET);

app.use((err, req, res, next) => {
  res.send({ message: err.message });
  next();
});
app.get("/errorasync", async (req, res, next) => {
  next(new Error("Error occured from /error"));
});

async function start() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3008, () => console.log(`server is readyyy!!`));
}
//app.listen(3008, () => console.log(`server is ready!!`));
start().catch((err) => console.log(err));
