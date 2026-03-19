import nodemailer from 'nodemailer';
import { env } from '@/helpers/ConfigEnv';

export const mailer = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: false,
  auth: {
    user: env.MAIL_EMAIL,
    pass: env.MAIL_PASSWORD,
  },
} as nodemailer.TransportOptions);
