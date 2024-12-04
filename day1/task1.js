import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  const left = [];
  const right = [];
  data.split('\n')
    .filter(l => l)
    .forEach(l => { const d = l.split('   '); left.push(parseInt(d[0])); right.push(parseInt(d[1])) });
  left.sort();
  right.sort();
  let dists = 0;
  for (let i = 0; i < left.length; i++)
    dists += Math.abs(left[i] - right[i]);
  return dists;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
