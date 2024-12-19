import { Channel, connect } from "amqplib";
import { logger } from "./logging";

let channel: Channel;

export const getChannel = async (): Promise<Channel> => {
  try {
    if (!channel) {
      // Log koneksi ke RabbitMQ
      logger.info("Connecting to RabbitMQ...");

      const connection = await connect("amqp://localhost:5672");

      // Log jika koneksi berhasil
      logger.info("Successfully connected to RabbitMQ");

      channel = await connection.createChannel();

      // Log pembuatan channel
      logger.info("Channel created successfully");

      await channel.assertQueue("lowStockQueue", {
        durable: true, // Pastikan queue bertahan setelah restart RabbitMQ
      });

      // Log jika queue berhasil dibuat/terbentuk
      logger.info('Queue "lowStockQueue" is ready');
    }

    return channel;
  } catch (error: any) {
    // Log kesalahan jika ada
    logger.error(`Failed to connect or create channel: ${error.message}`);
    throw error;
  }
};
