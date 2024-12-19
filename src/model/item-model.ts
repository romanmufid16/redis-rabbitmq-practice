export type ItemResponse = {
  id: number;
  name: string;
  quantity: number;
  minQuantity: number;
};

export type CreateItemRequest = {
  name: string;
  quantity: number;
  minQuantity: number;
};
