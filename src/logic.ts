import { Request, Response, NextFunction } from "express";
import { lists, ids } from "./database";
import {
  IListsRequest,
  IProductList,
  IList,
  CreateListRequired,
  CreateItensRequired,
} from "./interface";

export const listExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idExist = ids.find((element) => element === +request.params.id);
  if (!idExist) {
    return response.status(404).json({
      message: "List not Found",
    });
  }
  next();
};

export const itemExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

const validateCreateList = (payload: any): IListsRequest => {
  const keys: Array<string> = Object.keys(payload);
  const values: Array<string> = Object.values(payload);
  const requiredKeys: Array<CreateListRequired> = ["listName", "data"];

  const containsAllKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (
    !containsAllKeys ||
    keys.length > requiredKeys.length ||
    typeof payload.listName !== "string"
  ) {
    throw new Error(`Campos necessarios sao: ${requiredKeys}`);
  }

  // if (typeof values[2] !== "string") {
  //   throw new Error(`Campos necessarios sao: ${requiredKeys}`);
  // }

  return payload;
};

const validateItemList = (payload: any): IProductList => {
  const keys: Array<string> = Object.keys(payload);
  const values: Array<string> = Object.values(payload);
  const requiredKeys: Array<CreateItensRequired> = ["name", "quantity"];

  const containsAllKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllKeys || keys.length > requiredKeys.length) {
    throw new Error(`Campos necessarios sao: ${requiredKeys}`);
  }

  values.map((value) => {
    if (typeof value !== "string") {
      throw new Error(`Campos necessarios sao: ${requiredKeys}`);
    }
  });

  return payload;
};

export const createList = (request: Request, response: Response) => {
  try {
    const listData: IListsRequest = validateCreateList(request.body);
    const id: number = ids.length + 1;
    const idExist = ids.find((element) => element === id);
    if (idExist) {
      return response.status(409).json({
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
  lists.map((list) => {
    if (list.id === +request.params.id) {
      lists.splice(lists.indexOf(list), 1);
      return response.status(204).json("NO CONTENT");
    }
  });
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
