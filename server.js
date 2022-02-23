const express = require("express");
const app = express();

app.use(express.json());

const userRouter = require("./users/routes");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello from server");
});
app.listen(3001, () => console.log(`server is ready!!`));
