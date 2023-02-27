export const generateUniqueName = (prefix: string) =>
  `${prefix}-${Date.now().toString(32)}${Math.random().toString(32).slice(2)}`;
