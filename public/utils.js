function convertToRuntimeFormat(durationInMinutes) {
  if (typeof durationInMinutes !== 'number') {
    return '';
  }

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes - hours * 60;

  let output = '';

  if (hours > 1) {
    output += `${hours}h`;
  }
  output += `${minutes}`;
  return output;
}


function formatCurrency(number) {
  let num = number;

  if (typeof number !== 'number') {
    num = 0;
  }

  const currencyFormatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    },
  );

  return currencyFormatter.format(num);
}

module.exports = {
  convertToRuntimeFormat,
  formatCurrency,
};
