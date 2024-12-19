import express from "express";
import { ItemController } from "../controllers/item-controller";

const ItemRoutes = express.Router();

ItemRoutes.post('/', ItemController.addItem);

export default ItemRoutes;