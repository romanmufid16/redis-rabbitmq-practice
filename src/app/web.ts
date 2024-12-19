import cors from "cors";
import express from "express";
import errorMiddleware from "../middlewares/error-middleware";
import ItemRoutes from "../routes/item-routes";

const web = express();

web.use(cors());
web.use(express.json());

web.use('/api/items', ItemRoutes);

web.use(errorMiddleware);

export default web;