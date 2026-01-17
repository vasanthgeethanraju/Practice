/**
 * @param {any[]} items
 * @param {number} pageSize
 * @param {number} pageNumber // 1-based
 * @returns {{
 *   pageNumber:number,
 *   pageSize:number,
 *   totalItems:number,
 *   totalPages:number,
 *   hasPrev:boolean,
 *   hasNext:boolean,
 *   items:any[]
 * }}
 */
function paginate(items, pageSize, pageNumber) {
  // TODO 1: compute totalItems
  let totalItems = items.length;
  // TODO 2: handle invalid pageSize (<= 0)
  //   return metadata with items: [] and totalPages: 0
  if(pageSize <= 0) {
    return { pageNumber, pageSize, totalItems, totalPages : 0, hasPrev : false, hasNext : false, items : [] };
  }

  // TODO 3: compute totalPages (Math.ceil)
  let totalPages = Math.ceil(totalItems / pageSize);
  // TODO 4: if totalPages === 0 return early with empty items

  if (totalPages === 0) {
    return { pageNumber, pageSize, totalItems, totalPages : 0, hasPrev : false, hasNext : false, items : [] };
  }
  // TODO 5: if pageNumber is out of range (<1 or > totalPages), return empty items with correct metadata
  if (pageNumber < 1 || pageNumber > totalPages) {
    return { pageNumber, pageSize, totalItems, totalPages, hasPrev : false, hasNext : false, items : [] };
  }
  // TODO 6: compute slice start/end indexes (remember pageNumber is 1-based)
  // TODO 7: compute hasPrev and hasNext
  // TODO 8: return the final object
  const start = (pageNumber - 1) * pageSize,
        end   = start + pageSize;

  return { pageNumber, pageSize, totalItems, totalPages, hasPrev: pageNumber > 1, hasNext: pageNumber < totalPages, items: items.slice(start, end) };

}
// 1) Normal middle page
console.log(paginate([1,2,3,4,5], 2, 2).items); // [3,4]

// 2) Last page
console.log(paginate([1,2,3,4,5], 2, 3));
// items: [5], hasNext: false, hasPrev: true

// 3) Page out of range (too high)
console.log(paginate([1,2,3,4,5], 2, 4));
// items: [], totalPages: 3

// 4) Page 0 (invalid pageNumber)
console.log(paginate([1,2,3,4,5], 2, 0));
// items: [], totalPages: 3

// 5) Empty items
console.log(paginate([], 3, 1));
// totalItems:0, totalPages:0, items:[], hasPrev:false, hasNext:false

// 6) Invalid pageSize
console.log(paginate([1,2,3], 0, 1));
// items:[], totalPages:0 (or treat as invalid with totalPages:0), hasPrev:false, hasNext:false
