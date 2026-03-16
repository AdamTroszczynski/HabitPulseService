import prisma from '../../lib/prisma.js';
export const getUserById = async (dto) => {
    return prisma.user.findUnique({ where: dto });
};
export const getUserByEmail = async (dto) => {
    return prisma.user.findUnique({ where: dto });
};
export const createUser = async (dto) => {
    return prisma.user.create({ data: dto });
};
export const changeUserPassword = async (dto) => {
    return prisma.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
};
export const verifyUser = async (dto) => {
    return prisma.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};
//# sourceMappingURL=UserRepository.js.map