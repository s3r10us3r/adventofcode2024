import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  let result = 0;
  const reports = data.split('\n').filter(r => r).map(r => r.split(' ').filter(r => r).map((v, i, a) => parseInt(v)));
  console.log(reports.length);
  reports.forEach(r => {
    const asc = r.slice().sort((a, b) => a - b);
    const desc = r.slice().sort((a, b) => b - a);
    let maxDiff = 0;
    let minDiff = 4;
    if (r.every((v, i) => v === asc[i]) || r.every((v, i) => v === desc[i])) {
      for (let i = 1; i < r.length; i++) {
        const diff = Math.abs(r[i] - r[i - 1]);
        maxDiff = Math.max(diff, maxDiff);
        minDiff = Math.min(diff, minDiff);
      }
      if (maxDiff <= 3 && minDiff >= 1) {
        result++;
      }
    }
  });
  return result;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);

