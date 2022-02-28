const jwt = require("jsonwebtoken");

function authCheck(req, res, next) {
  let authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  authorization = authorization.split(" ")[1];
  const data = jwt.verify(authorization, process.env.JWT_SECRET);
  req.user = data;
  next();
}

module.exports = authCheck;
