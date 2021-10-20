const jwt = require("jsonwebtoken");

const auth =  async function(req, res, next){
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};


module.exports = auth;