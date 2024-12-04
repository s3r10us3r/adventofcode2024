import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  const re = /mul\(\d{1,3},\d{1,3}\)/g
  const found = data.match(re);
  let result = 0;
  const re2 = /\(([^)]+)\)/;
  found.forEach(mul => {
    let nums = re2.exec(mul)[1].split(',')
    nums = nums.map(e => parseInt(e));
    result += nums[0] * nums[1];
  })
  return result;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);

