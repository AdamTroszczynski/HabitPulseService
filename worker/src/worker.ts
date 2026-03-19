import './helpers/LoadEnv';
import { connectRabbitMQ, getChannel } from '@/utils/rabbitmq';
import { authEmailController } from '@/modules/Auth/authController';

const startWorker = async () => {
  const channel = getChannel();

  channel.prefetch(1);

  channel.consume('auth.email', async (msg) => {
    await authEmailController(msg, channel);
    console.log('Auth Email catched');
  });
  console.log('Worker listing on queue...');
};

const startApp = async () => {
  try {
    await connectRabbitMQ();
    await startWorker();
  } catch (err) {
    console.error('Failed to start worker:', err);
    process.exit(1);
  }
};

startApp();
