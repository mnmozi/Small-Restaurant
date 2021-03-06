import errorHandler from "errorhandler";
import app from "./app.js";
import logger from "./util/winston.js";

import dbConnection from "./config/dbConnection.js";
/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
process.on("uncaughtException", function (err) {
  console.log("Node NOT Exiting...");
  logger.error("%o", err);
});
if (process.env.PORT) {
  app.set("port", process.env.PORT);
  app.set("env", process.env.NODE_ENV);

  try {
    dbConnection();
    app.listen(app.get("port"), () => {
      logger.info(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      process.on("uncaughtException", function (exception) {
        console.log(exception);
      });
      logger.silly("Press CTRL-C to stop\n");
    });
  } catch (error) {
    logger.error("Error: " + error);
  }
} else {
  logger.error("error", "PORT NOT FOUND IN THE .env");
}
