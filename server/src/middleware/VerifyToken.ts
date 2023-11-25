import { Request, Response, NextFunction } from "express";
import { jwtSecretKey } from "../controllers/AuthController";
import * as jwt from "jsonwebtoken";
interface CustomRequest extends Request {
  user?: any;
}
const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token: string = req.headers.authorization
    ? req.headers.authorization.trim().split(" ")[1]
    : "";
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Error: ", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export { verifyToken };
