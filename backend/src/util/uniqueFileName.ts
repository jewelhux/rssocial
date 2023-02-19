const generateName = (prefix: string) =>
  `${prefix}-${Date.now().toString(32)}${Math.random().toString(32).slice(2)}`;

export default generateName;
