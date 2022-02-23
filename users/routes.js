const express = require("express");
const router = express.Router();
const userController = require("./controller");

let products = [];

router.get("/", userController.getAll);

router.post("/", userController.create);

router.put("/:uid", userController.update);

router.delete("/:uid", userController.deleteUser);

module.exports = router;
