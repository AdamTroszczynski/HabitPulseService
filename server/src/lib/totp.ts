import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

type Verify2FACodeDTO = {
  userSecret: string;
  code: string;
};

const NAME = 'HabitPulse';

export const generate2FASecret = (): speakeasy.GeneratedSecret => speakeasy.generateSecret({ name: NAME });

export const verify2FACode = (dto: Verify2FACodeDTO): boolean =>
  speakeasy.totp.verify({ secret: dto.userSecret, encoding: 'base32', token: dto.code, window: 1 });

export const generate2FAQrcode = async (secret: speakeasy.GeneratedSecret): Promise<string> => {
  if (!secret.otpauth_url) throw new Error('Missing otpauth_url');
  return QRCode.toDataURL(secret.otpauth_url);
};
