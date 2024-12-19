import dotenv from "dotenv";
import web from "./app/web";
import { logger } from "./app/logging";
import worker from "./utils/worker";
import schedule from "./utils/scheduler";

dotenv.config();
const PORT = process.env.PORT || 3000;
schedule.start();
web.listen(PORT, () => {
  worker();
  logger.info(`Listening on ${PORT}`);
});
