export const snakeToCapitalization = (item: string) => {
  return item
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const capitalization = (item: string) => {
  return item.charAt(0).toUpperCase() + item.slice(1);
};
