import { connectRabbitMQ, getChannel } from '@shared/lib/rabbitmq';
import { QUEUES } from '@shared/types/queue.types';
import { logger } from '@shared/lib/logger';
import http from 'node:http';
import { authEmailController } from '@/modules/Auth/authController';
import { consumeWithContext } from './helpers/AsyncStore';

let isReady = false;

const startWorker = async () => {
  const channel = getChannel();
  channel.prefetch(1);
  consumeWithContext(channel, QUEUES.AUTH_EMAIL, async (msg) => {
    const raw = JSON.parse(msg.content.toString());
    logger.info(
      {
        queue: QUEUES.AUTH_EMAIL,
        type: raw?.type,
      },
      'Task received',
    );
    await authEmailController(msg, channel);
  });
  logger.info('Worker listing on queue...');
};

const healthServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/ready') {
    res.writeHead(isReady ? 200 : 503);
    res.end(JSON.stringify({ status: isReady ? 'ok' : 'unavailable' }));
    return;
  }

  res.writeHead(404);
  res.end();
});

const startApp = async (attempt = 1) => {
  try {
    await connectRabbitMQ();
    await startWorker();
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

startApp();
healthServer.listen(3001, () => logger.info('Health server running on port 3001'));
