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
  return left.reduce((total, num) => total + right.filter(num2 => num2 == num).length * num, 0);
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
