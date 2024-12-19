import { logger } from "../app/logging";
import { getChannel } from "../app/rabbit";

const worker = async () => {
  const channel = await getChannel();

  channel.consume("lowStockQueue", (msg) => {
    if (!msg) return;

    try {
      const { name, quantity, minQuantity } = JSON.parse(
        msg.content.toString()
      );

      // Log informasi tentang pesan yang diterima
      logger.info(
        `Notifikasi: Stok barang "${name}" kurang (${quantity}/${minQuantity})`
      );

      // Acknowledge pesan setelah diproses
      channel.ack(msg);
    } catch (error: any) {
      // Log error jika parsing JSON gagal
      logger.error(`Failed to parse message: ${error.message}`);
      channel.nack(msg); // Nack jika terjadi kesalahan parsing, agar pesan tidak hilang
    }
  });
};

export default worker;
