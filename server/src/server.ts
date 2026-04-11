import { connectRabbitMQ } from '@shared/lib/rabbitmq';
import { logger } from '@shared/lib/logger';
import { redisClient } from '@shared/lib/redis';
import app from './app';
import { fail, ok } from './helpers/ResponsHelpers';
import { ErrorCodes } from './enums/ErrorCodes';
import { HttpStatus } from './enums/HttpStatus';

const PORT = process.env.PORT || 3000;
let isReady = false;

app.get('/health', (req, res) => {
  ok(res, { status: 'ok' });
});

app.get('/ready', (req, res) => {
  if (isReady) ok(res, { status: 'ok' });
  else fail(res, ErrorCodes.INTERNAL_ERROR, 'Unvailable', HttpStatus.INTERNAL_SERVER_ERROR);
});

const startApp = async (attempt = 1) => {
  try {
    await redisClient.connect();
    await connectRabbitMQ();
    isReady = true;
    logger.info({ message: 'All services connected' }, 'Status check');
  } catch (err) {
    if (attempt >= 5) {
      logger.fatal({ err }, 'Failed to connect after 5 attempts');
      process.exit(1);
    }
    logger.warn({ attempt }, 'Failed to connect, retrying...');
    setTimeout(() => startApp(attempt + 1), 10000);
  }
};

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
startApp();
