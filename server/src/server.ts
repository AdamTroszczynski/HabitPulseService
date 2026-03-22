import { connectRabbitMQ } from '@shared/lib/rabbitmq';
import redisClient from '@shared/lib/redis';
import { logger } from '@shared/lib/logger';
import app from './app';

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  await redisClient.connect();
  await connectRabbitMQ();

  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
};

startApp();
