import amqplib, { type Channel, type ChannelModel } from 'amqplib';
import { env } from '@/helpers/ConfigEnv';

let connection: ChannelModel;
let channel: Channel;

export const connetRabbitMQ = async (): Promise<void> => {
  connection = await amqplib.connect(env.RABBITMQ_URL, { vhost: env.RABBITMQ_VHOST });
  channel = await connection.createChannel();

  await channel.assertExchange('habitpulse.messages', 'direct', { durable: true });
  await channel.assertQueue('messages.email', { durable: true });
  await channel.bindQueue('messages.email', 'habitpulse.messages', 'email');

  console.log('RabbitMQ connected');
};

export const getChannel = (): Channel => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};
