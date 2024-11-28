export const snakeToCapitalization = (item: string) => {
  return item
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


export const isValidParam = (param: string | string[]): param is string => {
  return !Array.isArray(param);
}

export const capitalization = (item: string) => {
  return item.charAt(0).toUpperCase() + item.slice(1);
};
