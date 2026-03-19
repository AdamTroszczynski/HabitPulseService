import { sendActivationEmail, sendResetPasswordEmail } from '@/modules/Auth/authEmails';
import { AuthEmailDTO } from '@/modules/Auth/authSchemas';

export const sendEmail = async (dto: AuthEmailDTO): Promise<void> => {
  const { type, ...rest } = dto;
  switch (type) {
    case 'activation':
      await sendActivationEmail(rest);
      break;
    case 'resetPassword':
      await sendResetPasswordEmail(rest);
      break;
    default:
      throw new Error(`Unknown email type: ${dto.type}`);
  }
};
