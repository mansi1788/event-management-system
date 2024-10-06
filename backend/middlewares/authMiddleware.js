import JWT from "jsonwebtoken";

// Middleware to require sign-in (verify token)
export const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user details in request object
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

// Middleware to check if the user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).send({
      success: false,
      message: "Admin resource. Access denied.",
    });
  }
  next();
};

// Middleware to check if the user is vendor
export const isVendor = (req, res, next) => {
  if (req.user.role !== 2) {
    return res.status(403).send({
      success: false,
      message: "Vendor resource. Access denied.",
    });
  }
  next();
};
