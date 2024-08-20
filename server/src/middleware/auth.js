// Reference: https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4

import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization.slice(7);

  gconsole.log(token);

  if (!token) {
    return res.status(401).json("Token invalid. Access denied Missing Token.");
  }

  try {
    jwt.verify(token, process.env.API_SECRET, (error, decoded) => {
      if (error) {
        console.log(error);
        return res
          .status(401)
          .json({ msg: "Token invalid. Access denied.Incorrect Token" });
      }
      if (
        decoded.userType === "customer" &&
        req.originalUrl.startsWith("/api/v1/customers")
      ) {
        return res.status(403).json({ msg: "Not admin" });
      } else {
        req.userID = decoded.userID;
        decoded.userType;
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
