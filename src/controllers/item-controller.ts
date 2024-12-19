import { NextFunction, Request, Response } from "express";
import { CreateItemRequest } from "../model/item-model";
import { ItemService } from "../services/item-service";

export class ItemController {
  static async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateItemRequest = req.body;
      const result = await ItemService.add(request);
      res.status(201).json({
        success: true,
        message: "Item added successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
