import { connectRabbitMQ, getChannel } from '@shared/lib/rabbitmq';
import { QUEUES } from '@shared/types/queue.types';
import { logger } from '@shared/lib/logger';
import { authEmailController } from '@/modules/Auth/authController';
import { consumeWithContext } from './helpers/AsyncStore';

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

const startApp = async () => {
  try {
    await connectRabbitMQ();
    await startWorker();
  } catch (err) {
    logger.fatal({ err }, 'Failed to start worker:');
    process.exit(1);
  }
};

startApp();
