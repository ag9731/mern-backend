const app = require("../app");
const jwt  = require("jsonwebtoken");

exports.protected = (req,res,next) => {
    const token = req.cookies.token; // ✅ Read cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token
    req.user = decoded; // attach payload to request
    next(); // go to controller
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};



