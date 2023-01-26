import * as Express from "express";

declare global {
  namespace Express {
    interface Request {
      list: {
        listIndex: number;
      };
    }
  }
}
