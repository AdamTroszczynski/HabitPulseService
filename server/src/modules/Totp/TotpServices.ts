import { generate2FAQrcode, generate2FASecret, verify2FACode } from '@/lib/totp';
import { DisableServiceDTO, EnableServiceDTO, VerifySetupServiceDTO } from '@/modules/Totp/TotpServices.types';
import { changeUserTotp, changeUserTotpSecret, getUserById } from '@/repositories/User/UserRepository';
import { AppError } from '@/middlewares/ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

export const enableService = async (dto: EnableServiceDTO): Promise<string> => {
  const user = await getUserById({ id: dto.userId });
  if (user?.totpEnabled) throw new AppError(ErrorCodes.FORBIDDEN, 'TOTP already enabled', HttpStatus.FORBIDDEN);

  const secret = generate2FASecret();
  const qrCode = await generate2FAQrcode(secret);
  await changeUserTotpSecret({ id: dto.userId, secret: secret.base32 });
  return qrCode;
};

export const disableService = async (dto: DisableServiceDTO): Promise<void> => {
  const user = await getUserById({ id: dto.userId });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'TOTP already enabled', HttpStatus.NOT_FOUND);
  if (!user.totpEnabled || !user.secretBase32) throw new AppError(ErrorCodes.FORBIDDEN, 'TOTP is not enabled', HttpStatus.FORBIDDEN);

  const isVerified = verify2FACode(dto.code, user.secretBase32);
  if (!isVerified) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

  await changeUserTotp({ id: user.id, isEnabled: false });
  await changeUserTotpSecret({ id: user.id, secret: null });
};

export const verifySetupService = async (dto: VerifySetupServiceDTO): Promise<void> => {
  const user = await getUserById({ id: dto.userId });
  if (!user?.secretBase32) throw new AppError(ErrorCodes.FORBIDDEN, 'First enable totp', HttpStatus.FORBIDDEN);

  const isValid = verify2FACode(dto.code, user.secretBase32);
  if (!isValid) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

  await changeUserTotp({ id: user.id, isEnabled: true });
};
