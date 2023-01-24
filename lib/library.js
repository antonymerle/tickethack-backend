function getISODate(date) {
  const dateObj = new Date(date);
  const isoDate = dateObj.toISOString().split("T");
  return isoDate[0];
}
module.exports = getISODate;
