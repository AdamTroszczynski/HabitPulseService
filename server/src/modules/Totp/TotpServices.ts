import { generate2FAQrcode, generate2FASecret, verify2FACode } from '@/lib/totp';
import { DisableServiceDTO, EnableServiceDTO, VerifySetupServiceDTO } from '@/modules/Totp/TotpServices.types';
import { AppError } from '@/middlewares/ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';
import { UserRepository } from '@/repositories/User/UserRepository';

export class TotpService {
  constructor(private readonly userRepository: UserRepository) {}

  async enable(dto: EnableServiceDTO): Promise<string> {
    const user = await this.userRepository.getUserById({ id: dto.userId });
    if (user?.totpEnabled) throw new AppError(ErrorCodes.FORBIDDEN, 'TOTP already enabled', HttpStatus.FORBIDDEN);

    const secret = generate2FASecret();
    const qrCode = await generate2FAQrcode(secret);
    await this.userRepository.updateUserTotpSecret({ id: dto.userId, secret: secret.base32 });
    return qrCode;
  }

  async disable(dto: DisableServiceDTO): Promise<void> {
    const user = await this.userRepository.getUserById({ id: dto.userId });
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User not found', HttpStatus.NOT_FOUND);
    if (!user.totpEnabled || !user.secretBase32) throw new AppError(ErrorCodes.FORBIDDEN, 'TOTP is not enabled', HttpStatus.FORBIDDEN);

    const isVerified = verify2FACode(dto.code, user.secretBase32);
    if (!isVerified) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    await this.userRepository.updateUserTotp({ id: user.id, isEnabled: false });
    await this.userRepository.updateUserTotpSecret({ id: user.id, secret: null });
  }

  async verifySetup(dto: VerifySetupServiceDTO): Promise<void> {
    const user = await this.userRepository.getUserById({ id: dto.userId });
    if (!user?.secretBase32) throw new AppError(ErrorCodes.FORBIDDEN, 'First enable totp', HttpStatus.FORBIDDEN);

    const isValid = verify2FACode(dto.code, user.secretBase32);
    if (!isValid) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    await this.userRepository.updateUserTotp({ id: user.id, isEnabled: true });
  }
}
