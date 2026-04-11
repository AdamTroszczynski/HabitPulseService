import { asyncLocalStorage } from '@shared/helpers/AsyncStore';
import { Channel, ConsumeMessage } from 'amqplib';
import { randomUUID } from 'node:crypto';

export const consumeWithContext = (channel: Channel, queue: string, fn: (msg: ConsumeMessage) => Promise<void>): void => {
  channel.consume(queue, (msg) => {
    if (!msg) return;
    const correlationId = msg.properties.headers?.correlationId ?? randomUUID();
    asyncLocalStorage.run({ correlationId, errorMessage: null }, () => fn(msg));
  });
};
