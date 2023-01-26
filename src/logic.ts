import { Request, Response, NextFunction } from "express";
import { lists, ids } from "./database";
import { validateCreateList, validateItemList } from "./validade";
import { IListsRequest, IProductList, IList } from "./interface";

export const createList = (request: Request, response: Response) => {
  try {
    const listData: IListsRequest = validateCreateList(request.body);
    const id: number = ids.length + 1;
    const idExist = ids.find((element) => element === id);
    if (idExist) {
      return response.status(409).json({
        message: "Ids already exists",
      });
    }

    const newListData: IList = {
      id: id,
      ...listData,
    };

    ids.push(id);
    lists.push(newListData);

    return response.status(201).json(newListData);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal Server ERROR",
    });
  }
};

export const getAllLists = (request: Request, response: Response) => {
  return response.status(200).json(lists);
};

export const getList = (request: Request, response: Response) => {
  lists.map((list) => {
    if (list.id === +request.params.id) {
      return response.status(200).json(list);
    }
  });
};

export const deleteList = (request: Request, response: Response) => {
  const listIndex: number = request.list.listIndex;

  lists.splice(listIndex, 1);

  return response.status(204).send();
};

export const updateItemList = (request: Request, response: Response) => {
  try {
    const itemData: IProductList = validateItemList(request.body);
    lists.map((list) => {
      const itens = list.data;
      if (list.id === +request.params.id) {
        itens.map((item) => {
          if (item.name === request.params.name) {
            const newItem = Object.assign(item, itemData);
            return response.status(200).json(itemData);
          }
        });
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteItemList = (request: Request, response: Response) => {
  lists.map((list) => {
    const itens = list.data;
    if (list.id === +request.params.id) {
      itens.map((item) => {
        if (item.name === request.params.name) {
          itens.splice(itens.indexOf(item), 1);
          return response.status(204).send();
        }
      });
    }
  });
};
