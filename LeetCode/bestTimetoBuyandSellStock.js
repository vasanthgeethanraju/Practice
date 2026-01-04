// Leetcode 121. Best Time to Buy and Sell Stock

function maxProfit(prices) {
  let buyDay    = 0,
      sellDay   = 1, 
      maxProfit = 0;

  while(sellDay < prices.length) {
    if(prices[sellDay] > prices[buyDay]) {
      let profit = prices[sellDay] - prices[buyDay];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      buyDay = sellDay;
    }
    sellDay++;
  }
  return maxProfit;
}

const prices = [10,1,5,6,7,1];

console.log(maxProfit(prices));

//output 6