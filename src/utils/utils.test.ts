import { validateEmail } from '.';

describe('Check validateEmail function', () => {
  const email = {
    valid: 'e@e.com',
    invalid: 'ee.com'
  };
  it('should return true for valid email', () => {
    const value = validateEmail(email.valid);
    expect(value).toBe(true);
  });
  it('should return false for invalid email', () => {
    const value = validateEmail(email.invalid);
    expect(value).toBe(false);
  });
});
