export interface IListsRequest {
  listName: string;
  data: IProductList[];
}

export interface IProductList {
  name: string;
  quantity: string;
}

export type CreateListRequired = "listName" | "data";
export type CreateItensRequired = "name" | "quantity";

export interface IList extends IListsRequest {
  id: number;
}
