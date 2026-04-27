function formatDate(userDate) {
  const [m, day, y] = userDate.split('/');
  
  return y + m.padStart(2, '0') + day.padStart(2, '0');
}

console.log(formatDate("12/31/2014"));