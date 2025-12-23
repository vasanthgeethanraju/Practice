function mapped(arr) {
    let buyDay  = 0,
        sellDay = 1, 
        maxP    = 0;
  
    while(sellDay < arr.length) {
      if(arr[sellDay] > arr[buyDay]) {
        let profit = arr[sellDay] - arr[buyDay];
        maxP = Math.max(maxP, profit);
      } else {
        buyDay = sellDay;
      }
      sellDay++
    }
    return maxP;
  }
  
  const arr = [10,1,5,6,7,1];
  
  console.log(mapped(arr));

  //output 6