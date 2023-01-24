import { Request, Response } from "express";
import { lists } from "./database";
import { IListsRequest, IProductList, IList } from "./interface";

const ids: Array<number> = [];

export const createList = (request: Request, response: Response) => {
  const listData: IListsRequest = request.body;
  const id: number = Math.floor(Math.random() * 1000);
  const idExist = ids.find((element) => element === id);

  if (idExist) {
    return response.status(400).json({
      message: "ids already exists",
    });
  }

  const newListData: IList = {
    id: id,
    ...listData,
  };

  ids.push(id);
  lists.push(newListData);

  return response.status(201).json(newListData);
};

export const getAllLists = (request: Request, response: Response) => {
  return response.status(201).json(lists);
};
