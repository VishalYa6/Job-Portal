import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
   
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // console.log("User role:", req.user?.role);
    // console.log("Allowed roles:", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};