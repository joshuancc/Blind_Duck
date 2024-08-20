// Reference: https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4

import jwt from "jsonwebtoken";

// User enum type
export const UserType = {
  Admin: "admin",
  Customer: "customer"
};

export const auth = (req, res, next) => {
  // Check if authorization header is included
  if (!req.headers.authorization) {
    return res.status(401).json({"error": "Missing authorization header"});
  }

  // Check if authorization header is formatted as expected
  const auth_components = req.headers.authorization.split(" ");
  if (auth_components.length !== 2 || auth_components[0] !== "Bearer") {
    return res.status(401).json({"error": "Malformed authorization header"});
  }

  try {
    jwt.verify(auth_components[1], process.env.API_SECRET, (error, decoded) => {
      // Check if the token is expired or invalid
      if (error) {
        return res.status(401).json({"error": "Invalid token"});
      }

      // Check if the user has sufficient privileges
      const customerEndpoint = req.originalUrl.startsWith("/api/v1/customers");
      if (decoded.userType === UserType.Customer && !customerEndpoint || decoded.userType === UserType.Admin && customerEndpoint) {
        return res.status(403).end();
      } else {
        req.userEmail = decoded.email;
        next();
      }
    });
  } catch (e) {
    console.error("AUTH MIDDLEWARE ERROR!");
    console.error(e);
    res.status(500).json({ msg: "Server Error" });
  }
};

export default auth;
