import { createHash } from 'crypto';

export const hashPassword = (password: string) => {
  const hashedPassword = createHash('sha256').update(password).digest('base64');
  return hashedPassword;
};
