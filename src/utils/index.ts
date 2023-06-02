export function validateEmail(email: string): boolean {
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return emailRegex.test(email);
}
