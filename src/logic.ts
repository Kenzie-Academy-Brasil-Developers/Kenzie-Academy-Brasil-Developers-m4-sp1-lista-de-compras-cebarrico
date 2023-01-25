import { Request, Response } from "express";
import { lists, ids } from "./database";
import { IListsRequest, IProductList, IList } from "./interface";

export const createList = (request: Request, response: Response) => {
  const listData: IListsRequest = request.body;
  const id: number = ids.length + 1;
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

export const getList = (request: Request, response: Response) => {
  lists.map((list) => {
    if (list.id === +request.params.id) {
      return response.status(201).json(list);
    }
  });
};

export const deleteList = (request: Request, response: Response) => {
  lists.map((list) => {
    if (list.id === +request.params.id) {
      lists.splice(lists.indexOf(list), 1);
      return response.status(204).json("NO CONTENT");
    }
  });
};

export const getItemList = (request: Request, response: Response) => {
  const itemData: IProductList = request.body;
  lists.map((list) => {
    const itens = list.data;
    if (list.id === +request.params.id) {
      itens.map((item) => {
        if (item.name === request.params.name) {
          console.log(item);
          const newItem = Object.assign(item, itemData);
          return response.status(201).json(itemData);
        }
      });
    }
  });
};
export const deleteItemList = (request: Request, response: Response) => {
  const itemData: IProductList = request.body;
  lists.map((list) => {
    const itens = list.data;
    if (list.id === +request.params.id) {
      itens.map((item) => {
        if (item.name === request.params.name) {
          itens.splice(itens.indexOf(item), 1);
          return response.status(204).json("NO CONTENT");
        }
      });
    }
  });
};
