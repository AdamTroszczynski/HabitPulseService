import { Channel, ConsumeMessage } from 'amqplib';
import { AuthEmailDTOSchema } from '@/modules/Auth/authSchemas';
import { sendEmail } from '@/modules/Auth/authServices';

export const authEmailController = async (msg: ConsumeMessage | null, channel: Channel) => {
  if (!msg) return;
  try {
    const data = JSON.parse(msg.content.toString());
    const parsedData = AuthEmailDTOSchema.parse(data);

    await sendEmail(parsedData);

    channel.ack(msg);
  } catch (err) {
    console.error('Task error', err);
    channel.nack(msg, false, false);
  }
};
