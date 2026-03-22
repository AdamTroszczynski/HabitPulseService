import { Channel, ConsumeMessage } from 'amqplib';
import { logger } from '@shared/lib/logger';
import { ZodError } from 'zod';
import { QUEUES } from '@shared/types/queue.types';
import { AuthEmailDTOSchema } from '@/modules/Auth/authSchemas';
import { sendEmail } from '@/modules/Auth/authServices';

export const authEmailController = async (msg: ConsumeMessage | null, channel: Channel) => {
  if (!msg) return;
  try {
    const data = JSON.parse(msg.content.toString());
    const parsedData = AuthEmailDTOSchema.parse(data);

    await sendEmail(parsedData);
    logger.info(
      {
        queue: QUEUES.AUTH_EMAIL,
        type: parsedData.type,
        email: parsedData.email,
      },
      'Task finished',
    );
    channel.ack(msg);
  } catch (err) {
    if (err instanceof ZodError) {
      logger.error(
        {
          err,
        },
        'Task zod error',
      );
    } else {
      logger.error(
        {
          err,
        },
        'Task error',
      );
    }
    channel.nack(msg, false, false);
  }
};
