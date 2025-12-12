export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  uuidv4:
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  roles: /^(admin|moderator|user)$/,
  zipcode: /^\d{5}(-\d{4})?$/,
  phoneNumber:
    /^\+?1?\s*(?:\([2-9]\d{2}\)|[2-9]\d{2})[ .-]?\d{3}[ .-]?\d{4}(?:\s*(?:x|ext\.?|extension)\s*\d{1,5})?$/,
};
