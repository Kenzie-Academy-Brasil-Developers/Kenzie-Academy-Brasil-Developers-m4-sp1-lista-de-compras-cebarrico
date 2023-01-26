import {
  IListsRequest,
  CreateItensRequired,
  CreateListRequired,
  IProductList,
} from "./interface";

export const validateCreateList = (payload: any): IListsRequest => {
  const keys: Array<string> = Object.keys(payload);

  const requiredKeys: Array<CreateListRequired> = ["listName", "data"];

  const containsAllKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (
    !containsAllKeys ||
    keys.length > requiredKeys.length ||
    typeof payload.listName !== "string"
  ) {
    throw new Error(`Necessary fields are: ${requiredKeys}`);
  }

  return payload;
};

export const validateItemList = (payload: any): IProductList => {
  const keys: Array<string> = Object.keys(payload);
  const values: Array<string> = Object.values(payload);
  const requiredKeys: Array<CreateItensRequired> = ["name", "quantity"];

  const containsAllKeys: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllKeys || keys.length > requiredKeys.length) {
    throw new Error(`Necessary fields are: ${requiredKeys}`);
  }

  values.map((value) => {
    if (typeof value !== "string") {
      throw new Error(`Necessary fields are: ${requiredKeys}`);
    }
  });

  return payload;
};
