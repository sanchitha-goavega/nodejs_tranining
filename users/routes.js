const express = require("express");
const router = express.Router();
const userController = require("./controller");

const authCheck = require("../auth/authCheck");

let products = [];

router.get("/", authCheck, userController.getAll);

router.post("/", authCheck, userController.create);

router.put("/:uid", authCheck, userController.update);

router.delete("/:uid", authCheck, userController.deleteUser);

module.exports = router;
