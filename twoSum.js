function mapped(str, target) {
  const map = new Map();
  for (let i = 0; i < str.length; i ++) {
    const comp = target - str[i];
    if (map.has(comp)) {
      return [map.get(comp), i];
    }
    map.set(str[i], i);
  }
  return [];
}

const str = [3, 2, 4, 6, 7, 8, 9];
console.log(mapped(str, 11));