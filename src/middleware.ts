import { Request, Response, NextFunction } from "express";
import { ids, lists } from "./database";

export const listExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const listIndex = lists.findIndex(
    (element) => element.id === +request.params.id
  );

  if (listIndex === -1) {
    return response.status(404).json({
      message: "List not Found",
    });
  }

  request.list = {
    listIndex: listIndex,
  };

  next();
};

export const itemExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const list = lists.find((element) => element.id === +request.params.id);
  if (list) {
    const nameExist = list.data.find((ele) => ele.name === request.params.name);

    if (!nameExist) {
      return response.status(404).json({
        message: "Item not Found",
      });
    }
  }

  next();
};
