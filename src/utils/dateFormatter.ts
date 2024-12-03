export const dateformatter = (date: Date) => {
  const day = new Date().getDate() - date.getDate();
  const month = new Date().getMonth() - date.getMonth();
  const year = new Date().getFullYear() - date.getFullYear();

  if(!day) {
    return `${year} Year ${month} Months`;
  }
  if(!month) {
    return `${year} Year ${day} Days`;
  }
  return    `${month} Months ${day} Days`;
};
