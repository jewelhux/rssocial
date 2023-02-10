const partText = (text: string) => {
  const first = text.slice(0, 5);
  const second = text.slice(-7);

  return `${first}...${second}`;
};

export { partText };
