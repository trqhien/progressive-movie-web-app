export function convertToRuntimeFormat(durationInMinutes) {
  if (typeof durationInMinutes !== 'number') {
    return ''
  }

  const hours = Math.floor(mindurationInMinutesutes / 60);
  const minutes = durationInMinutes - hours * 60;

  const output = ''

  if (hours > 1) { output += `${hours}h` }
  output += `${minutes}m`
  return output
}


export function formatCurrency(number) {
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
