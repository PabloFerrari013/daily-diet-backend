import { NextFunction, Request, Response } from "express";

export function isLoggedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req);
}
