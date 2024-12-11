import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' }).split(' ').filter(n => n).map(n => parseInt(n));
}


function findNext(num) {
  let sol;
  if (num === 0) {
    sol = [1];
  } else {
    let str = num.toString();
    if (str.length % 2 === 0) {
      sol = [parseInt(str.slice(0, str.length / 2)), parseInt(str.slice(str.length / 2, str.length))];
    }
    else {
      sol = [num * 2024];
    }
  }
  return sol;
}


const lookup = new Map();
function key(num, step) {
  return `${num}, ${step}`;
}

function findCount(num, steps) {
  if (steps === 0) {
    return 1;
  }

  const k = key(num, steps);
  if (lookup.get(k)) {
    const result = lookup.get(key(num, steps));
    return result;
  }

  const next = findNext(num);
  let result = 0;
  for (const n of next) {
    result += findCount(n, steps - 1);
  }
  lookup.set(k, result);
  return result;
}

const maxSteps = 1000;

function solve(data) {
  let sum = 0;
  for (const num of data) {
    sum += findCount(num, maxSteps);
  }
  return sum;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
