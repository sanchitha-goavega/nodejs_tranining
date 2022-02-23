const express = require("express");
const router = express.Router();
const userController = require("./controller");

let products = [];

router.get("/", userController.getAll);

router.post("/", userController.create);

router.put("/:code", userController.update);

router.delete("/:code", userController.deleteUser);

module.exports = router;
