import cron from "node-cron";
import redisClient from "../app/redis";
import { getChannel } from "../app/rabbit";
import { logger } from "../app/logging";

const schedule = cron.schedule("* * * * *", async () => {
  const keys = await redisClient.keys("item:*");
  const channel = await getChannel();

  for (const key of keys) {
    const itemData = await redisClient.get(key);
    if (!itemData) continue;

    const item = JSON.parse(itemData);
    const { id, name, quantity, minQuantity } = item;

    if (quantity < minQuantity) {
      channel.sendToQueue(
        "lowStockQueue",
        Buffer.from(JSON.stringify({ id, name, quantity, minQuantity }))
      );

      logger.info(`Low stock alert for item : ${name}`);
    }
  }
});

export default schedule;