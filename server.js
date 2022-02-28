const express = require("express");
const userRouter = require("./users/routes");
const authRouter = require("./auth/routes");
const dotenv = require("dotenv");

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
app.listen(3008, () => console.log(`server is ready!!`));
