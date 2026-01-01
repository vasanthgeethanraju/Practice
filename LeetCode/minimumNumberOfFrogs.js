
//LeetCode 1419: Minimum Number of Frogs Croaking

function minNumberOfFrogs(croakOfFrogs) {
  let c = 0, r = 0, o = 0, a = 0;
  let active = 0; // frogs currently in-progress (started but not finished)
  let maxActive = 0;

  for (const ch of croakOfFrogs) {
    if (ch === 'c') {
      // start a new croak
      c++;
      active++;
      if (active > maxActive) maxActive = active;
    } else if (ch === 'r') {
      if (c === 0) return -1;
      c--; r++;
    } else if (ch === 'o') {
      if (r === 0) return -1;
      r--; o++;
    } else if (ch === 'a') {
      if (o === 0) return -1;
      o--; a++;
    } else if (ch === 'k') {
      if (a === 0) return -1;
      a--;
      // one frog finished; it can be reused later
      active--;
    } else {
      return -1;
    }
  }

  // all frogs must have finished (no partial croaks left)
  if (c !== 0 || r !== 0 || o !== 0 || a !== 0) return -1;

  return maxActive;
}
