import { Router } from "express";
import {
    create,
    remove,
    findOne,
    find,
    addCuisine
} from "../../../controller/userController.js";

const route = Router();
export default (app: Router) => {

    app.use("/user", route);
    route.get("/:id", findOne);
    route.get("/", find);
    route.delete("/:id", remove);
    route.post("/", create);
    route.post("/:id", addCuisine);

    return app;
};
