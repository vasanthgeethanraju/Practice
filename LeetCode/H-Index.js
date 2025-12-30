// Leetcode 274. H-Index

function solution(citations) {
  citations.sort((a,b) => b-a);
  let hIndex = 0;

  for (let i = 0; i < citations.length; i++) {
    const papers = i + 1;
    if (citations[i] >= papers) hIndex = papers;
    else break;
  }

  return hIndex;
};

console.log(solution([3,0,6,1,5]))