import { AUTH_EMAIL_TYPES } from '@shared/types/queue.types';
import { sendActivationEmail, sendResetPasswordEmail } from '@/modules/Auth/authEmails';
import { AuthEmailDTO } from '@/modules/Auth/authSchemas';

export const sendEmail = async (dto: AuthEmailDTO): Promise<void> => {
  const { type, ...rest } = dto;
  switch (type) {
    case AUTH_EMAIL_TYPES.ACTIVATION:
      await sendActivationEmail(rest);
      break;
    case AUTH_EMAIL_TYPES.RESET_PASSWORD:
      await sendResetPasswordEmail(rest);
      break;
    default:
      throw new Error(`Unknown email type: ${dto.type}`);
  }
};
