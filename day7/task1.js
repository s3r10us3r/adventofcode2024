import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n').filter(l => l);
  data = data.map((v, i, a) => {
    const line = v.split(':');
    const left = parseInt(line[0]);
    const right = line[1].split(' ')
      .filter(v => v)
      .slice(0)
      .map(num => parseInt(num));
    return [left, right];
  });
  return data;
}

function combs(n) {
  if (n === 1)
    return ['+', '*'];

  let signs = combs(n - 1);
  const p = signs.map(res => '+' + res);
  const m = signs.map(res => '*' + res);
  return p.concat(p, m);
}


function solveLine(line) {
  const left = line[0];
  const right = line[1];
  const sign_combs = combs(right.length - 1);
  for (const signs of sign_combs) {
    let res = right[0];
    for (let i = 0; i < signs.length; i++) {
      const c = signs[i];
      if (c === '*')
        res *= right[i + 1];
      else
        res += right[i + 1];
    }
    if (res === left)
      return res;
  }
  return 0;
}

function solve(data) {
  const result = data.reduce((total, v) => total + solveLine(v), 0);
  return result;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
