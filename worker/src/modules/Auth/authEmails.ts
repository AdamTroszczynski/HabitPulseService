import { env } from '@shared/helpers/ConfigEnv';
import { mailer } from '@/utils/nodemail';
import { SendActivationEmailDTO, SendResetPasswordEmailDTO } from '@/modules/Auth/authEmails.types';

export const sendActivationEmail = async (dto: SendActivationEmailDTO): Promise<void> => {
  const info = await mailer.sendMail({
    from: env.MAIL_EMAIL,
    to: dto.email,
    subject: 'Aktywuj swoje konto 🚀',
    text: `Cześć!

Dziękujemy za rejestrację 😊

Aby aktywować swoje konto, kliknij w poniższy link:
${dto.token}

Jeśli to nie Ty zakładałeś konto — zignoruj tę wiadomość.

Pozdrawiamy,
Zespół HabitPulse`,
    html: `
      <h2>Cześć! 👋</h2>
      <p>Dziękujemy za rejestrację 😊</p>
      <p>Aby aktywować swoje konto, kliknij w przycisk poniżej:</p>
      ${dto.token}
      <p style="margin-top:20px;">Jeśli to nie Ty zakładałeś konto — zignoruj tę wiadomość.</p>
      <p>Pozdrawiamy,<br/>Zespół HabitPulse</p>
    `,
  });

  if (info.rejected.length >= 1) throw new Error('Failed to send email');
};

export const sendResetPasswordEmail = async (dto: SendResetPasswordEmailDTO): Promise<void> => {
  const info = await mailer.sendMail({
    from: env.MAIL_EMAIL,
    to: dto.email,
    subject: 'Reset hasła 🔐',
    text: `Cześć!

Otrzymaliśmy prośbę o zresetowanie hasła.

Kliknij w poniższy link, aby ustawić nowe hasło:
${dto.token}

Jeśli to nie Ty wysłałeś prośbę — zignoruj tę wiadomość.

Pozdrawiamy,
Zespół HabitPulse`,
    html: `
      <h2>Cześć! 👋</h2>
      <p>Otrzymaliśmy prośbę o zresetowanie hasła.</p>
      <p>Kliknij poniżej, aby ustawić nowe hasło:</p>
      ${dto.token}
      <p style="margin-top:20px;">Jeśli to nie Ty wysłałeś prośbę — zignoruj tę wiadomość.</p>
      <p>Pozdrawiamy,<br/>Zespół HabitPulse</p>
    `,
  });

  if (info.rejected.length >= 1) throw new Error('Failed to send email');
};
