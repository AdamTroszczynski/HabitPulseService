import app from './app.js';
import { connetRabbitMQ } from './lib/rabbitmq.js';
import redisClient from './lib/redis.js';

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  await redisClient.connect();
  await connetRabbitMQ();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
