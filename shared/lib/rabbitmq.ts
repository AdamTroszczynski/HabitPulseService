import amqplib, { type Channel, type ChannelModel } from 'amqplib';
import { env } from '@shared/helpers/ConfigEnv';
import { logger } from '@shared/lib/logger';

let connection: ChannelModel;
let channel: Channel;

export const connectRabbitMQ = async (): Promise<void> => {
  connection = await amqplib.connect(env.RABBITMQ_URL, { vhost: env.RABBITMQ_VHOST });
  channel = await connection.createChannel();

  await channel.assertExchange('habitpulse.auth', 'direct', { durable: true });
  await channel.assertQueue('auth.email', { durable: true });
  await channel.bindQueue('auth.email', 'habitpulse.auth', 'email');

  logger.info('RabbitMQ connected');
};

export const getChannel = (): Channel => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};
