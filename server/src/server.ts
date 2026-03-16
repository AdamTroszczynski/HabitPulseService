import app from './app';
import { connetRabbitMQ } from './lib/rabbitmq';
import redisClient from './lib/redis';

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  await redisClient.connect();
  await connetRabbitMQ();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp();
