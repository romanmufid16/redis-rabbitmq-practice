import { prismaClient } from "../app/database";
import redisClient from "../app/redis";
import { CreateItemRequest, ItemResponse } from "../model/item-model";
import { ItemValidation } from "../validation/item-validation";
import { Validation } from "../validation/validation";

export class ItemService {
  static async add(request: CreateItemRequest): Promise<ItemResponse> {
    const itemRequest = Validation.validate(ItemValidation.CREATE, request);

    const item = await prismaClient.item.create({
      data: itemRequest,
      select: {
        id: true,
        name: true,
        quantity: true,
        minQuantity: true,
      },
    });

    await redisClient.set(`item:${item.id}`, JSON.stringify(item));

    return item;
  }
}
