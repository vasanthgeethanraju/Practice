class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
      let encodedStr = "";
      for(let str of strs) {
        encodedStr += `${str.length}#` + str;
      }
      return encodedStr;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
      let i=0;
      let res = [];
      while(i < str.length) {
        let j=i;
        while(str[j] !== "#") j++;
        const length = parseInt(str.slice(i, j));
        res.push(str.slice(j+1, j+1+length));
        i = j+1+length;
      }
      return res;
    }
}

const solution = new Solution();

const input = [ 'lint', 'code', 'love', 'you' ]
const encoded = solution.encode(input);
console.log(encoded);

const decoded = solution.decode(encoded);
console.log(decoded);

//output:
// 4#lint4#code4#love3#you
// [ 'lint', 'code', 'love', 'you' ]
