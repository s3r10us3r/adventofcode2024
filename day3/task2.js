import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  const re = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
  const found = data.match(re);
  let result = 0;
  const re2 = /\(([^)]+)\)/;
  let canMul = true;
  found.forEach(command => {
    const command_beginning = command.substring(0, 3);
    if (command_beginning === 'mul' && canMul) {
      const nums = re2.exec(command)[1].split(',').map(e => parseInt(e));
      result += nums[0] * nums[1];
    } else if (command_beginning === 'do(') {
      canMul = true;
    } else {
      canMul = false;
    }
  })
  return result;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);

