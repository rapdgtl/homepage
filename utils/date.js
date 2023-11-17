function normalizeDate(date) {
  return `${date < 10 ? '0' : ''}${date}`;
}

export function getDateString(date) {
  return `${normalizeDate(date.getDate())}-${normalizeDate(
    date.getMonth() + 1
  )}-${date.getFullYear()} ${normalizeDate(date.getHours())}:${normalizeDate(
    date.getMinutes()
  )}:${normalizeDate(date.getSeconds())}
`;
}
