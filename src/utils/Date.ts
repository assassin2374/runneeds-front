export const convertJST = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9);
  return newDate;
};
export const dateToString = (date: Date): string => {
  const newDate = new Date(date);
  const yearNum = newDate.getFullYear();
  //月だけ+1すること
  const monthNum = ("00" + (newDate.getMonth() + 1)).slice(-2);
  const dateNum = ("00" + newDate.getDate()).slice(-2);
  //const dayNum = newDate.getDay();
  const hourNum = ("00" + newDate.getHours()).slice(-2);
  const minuteNum = ("00" + newDate.getMinutes()).slice(-2);
  const result = `${yearNum}/${monthNum}/${dateNum} ${hourNum}:${minuteNum}`;
  return result;
};
