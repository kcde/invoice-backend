import { nanoid, customAlphabet } from 'nanoid';
export function validateEmail(email: string): boolean {
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return emailRegex.test(email);
}

export async function generateID() {
  const nanoidLetters = customAlphabet('abcdefghijklmnopqrstuvwxyz', 2);
  const nanoidNumbers = customAlphabet('1234567890', 4);
  return `${nanoidLetters()}${nanoidNumbers()}`;
}

generateID();
