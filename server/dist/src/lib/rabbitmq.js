import amqplib from 'amqplib';
import { env } from '../helpers/ConfigEnv.js';
let connection;
let channel;
export const connetRabbitMQ = async () => {
    connection = await amqplib.connect(env.RABBITMQ_URL, { vhost: env.RABBITMQ_VHOST });
    channel = await connection.createChannel();
    await channel.assertExchange('habitpulse.messages', 'direct', { durable: true });
    await channel.assertQueue('messages.email', { durable: true });
    await channel.bindQueue('messages.email', 'habitpulse.messages', 'email');
    console.log('RabbitMQ connected');
};
export const getChannel = () => {
    if (!channel)
        throw new Error('RabbitMQ channel not initialized');
    return channel;
};
//# sourceMappingURL=rabbitmq.js.map