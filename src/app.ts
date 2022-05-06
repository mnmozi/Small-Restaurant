import express from "express";
import routes from "./api/index.js";

import logger from "./util/winston.js";
logger.info("Hello People!");


const app = express();
app.use(express.json());
app.use("/", routes());
export default app;

// const result = await dataSource();
