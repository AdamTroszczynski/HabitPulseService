import { asyncLocalStorage } from '@shared/helpers/AsyncStore';
import { logger } from '@shared/lib/logger';
import { getChannel } from '@shared/lib/rabbitmq';
import { EXCHANGES, AUTH_ROUTING_KEYS, AUTH_EMAIL_TYPES } from '@shared/types/queue.types';
import { randomUUID } from 'node:crypto';

type SendActivationEmailDTO = {
  email: string;
  token: string;
};

type SendResetPasswordEmailDTO = {
  email: string;
  token: string;
};

export const sendToAuthQueue = {
  sendActivationEmail: (dto: SendActivationEmailDTO) => {
    const store = asyncLocalStorage.getStore();
    getChannel().publish(
      EXCHANGES.AUTH,
      AUTH_ROUTING_KEYS.EMAIL,
      Buffer.from(JSON.stringify({ type: AUTH_EMAIL_TYPES.ACTIVATION, email: dto.email, token: dto.token })),
      { persistent: true, headers: { correlationId: store?.correlationId ?? randomUUID() } },
    );
    logger.info(
      {
        exchange: EXCHANGES.AUTH,
        routingKey: AUTH_ROUTING_KEYS.EMAIL,
        type: AUTH_EMAIL_TYPES.ACTIVATION,
        email: dto.email,
      },
      'Task added to queue',
    );
  },

  sendResetPasswordEmail: (dto: SendResetPasswordEmailDTO) => {
    const store = asyncLocalStorage.getStore();
    getChannel().publish(
      EXCHANGES.AUTH,
      AUTH_ROUTING_KEYS.EMAIL,
      Buffer.from(JSON.stringify({ type: AUTH_EMAIL_TYPES.RESET_PASSWORD, email: dto.email, token: dto.token })),
      { persistent: true, headers: { correlationId: store?.correlationId ?? randomUUID() } },
    );
    logger.info(
      {
        exchange: EXCHANGES.AUTH,
        routingKey: AUTH_ROUTING_KEYS.EMAIL,
        type: AUTH_EMAIL_TYPES.ACTIVATION,
        email: dto.email,
      },
      'Task added to queue',
    );
  },
};
