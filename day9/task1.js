import fs from 'node:fs';

function readData(path) {
  const data = fs.readFileSync(path, { encoding: 'utf8' }).split('');
  let s = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < parseInt(data[i]); j++) {
        s.push(Math.floor(i / 2).toString());
      }
    } else {
      for (let j = 0; j < parseInt(data[i]); j++)
        s.push('.');
    }
  }
  return s;
}


function solve(data) {
  console.log(data);
  let l = 0;
  let r = data.length - 1;
  while (l < r) {
    if (data[l] !== '.') {
      l++;
    }
    if (data[r] === '.') {
      r--;
    }
    if (data[l] === '.' && data[r] !== '.') {
      const temp = data[l];
      data[l] = data[r];
      data[r] = temp;
    }
  }
  let checkSum = BigInt(0);
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '.')
      break;
    checkSum += BigInt(parseInt(data[i])) * BigInt(i);
  }
  return checkSum;
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
