function padding(str: string) {
  return str.padStart(2, "0");
}

export const yyyyMMddHHmmss = (date: Date) => {
  const mm = padding(String(date.getMonth() + 1));
  const dd = padding(String(date.getDate()));
  const hour = padding(String(date.getHours()));
  const minutes = padding(String(date.getMinutes()));
  const seconds = padding(String(date.getSeconds()));

  return `${date.getFullYear()}-${mm}-${dd} ${hour}:${minutes}:${seconds}`;
};

export const reverseYYYYMMddHHmmss = (yyyymmddhhmmss: string) => {
  const yyyy = Number(yyyymmddhhmmss.slice(0, 4));
  const mm = Number(yyyymmddhhmmss.slice(5, 7)) - 1;
  const dd = Number(yyyymmddhhmmss.slice(8, 10));

  const hour = Number(yyyymmddhhmmss.slice(11, 13));
  const minutes = Number(yyyymmddhhmmss.slice(14, 16));
  const seconds = Number(yyyymmddhhmmss.slice(17, 19));

  return new Date(yyyy, mm, dd, hour, minutes, seconds);
};
