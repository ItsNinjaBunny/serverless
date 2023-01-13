import * as bcrypt from 'bcryptjs';

export const hash = async (password: string, salt: number = 10) => {
  console.log(password, salt);
  return await bcrypt.hash(password, salt);
}

export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}
