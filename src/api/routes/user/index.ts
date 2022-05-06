import { NextFunction, Request, Response } from "express";

import { Router } from "express";
import logger from "../../../util/winston.js";
import restaurantRoutes from './restaurant.js'
import userRoutes from './user.js'

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  restaurantRoutes(route)
  userRoutes(route)
};
