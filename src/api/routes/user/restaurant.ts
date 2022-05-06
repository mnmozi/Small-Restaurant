import { Router } from "express";
import {
    create,
    remove,
    findOne,
    find,
    findWithin
} from "../../../controller/restaurantController.js";

const route = Router();
export default (app: Router) => {
    app.use("/restaurant", route);

    route.get("/findWithin", findWithin);
    route.get("/:id", findOne);
    route.get("/", find);
    route.delete("/:id", remove);
    route.post("/", create);

    return app;
};
