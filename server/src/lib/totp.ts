import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { TOTP_NAME } from '@/const/CommonConst';

export const generate2FASecret = (): speakeasy.GeneratedSecret => speakeasy.generateSecret({ name: TOTP_NAME });

export const verify2FACode = (code: string, userSecret: string): boolean => speakeasy.totp.verify({ secret: userSecret, encoding: 'base32', token: code, window: 1 });

export const generate2FAQrcode = async (secret: speakeasy.GeneratedSecret): Promise<string> => {
  if (!secret.otpauth_url) throw new Error('Missing totpauth_url');
  return QRCode.toDataURL(secret.otpauth_url);
};
