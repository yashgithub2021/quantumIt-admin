export const getDateTime = (dt) => {
  const dT = dt.split(".")[0].split("T");
  return `${dT[0]} ${dT[1]}`;
};

export function generateRandomSixDigitNumber() {
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

export function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}