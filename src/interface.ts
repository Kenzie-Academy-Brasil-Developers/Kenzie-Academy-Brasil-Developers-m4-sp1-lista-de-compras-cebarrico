export interface IListsRequest {
  listName: string;
  data: IProductList[];
}

export interface IProductList {
  name: string;
  quantity: string;
}

export interface IList extends IListsRequest {
  id: number;
}
