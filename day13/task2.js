import fs from 'node:fs';

function extractXy(line) {
  line = line.trim();
  const data = line.split(':')[1].split(', ');
  const x = parseInt(data[0].trim().slice(2));
  const y = parseInt(data[1].trim().slice(2));
  return {
    x: x,
    y: y
  };
}

function checkSolution(a, b, bt, m, n) {
  m = Math.round(m);
  n = Math.round(n);

  const x = a.x * n + b.x * m;
  const y = a.y * n + b.y * m;
  return x === bt.x && y === bt.y && m >= 0 && n >= 0;
}

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n\n').filter(l => l);
  data = data.map(block => {
    const lines = block.split('\n').filter(b => b);
    return lines.map(line => extractXy(line));
  });
  return data;
}

function solve(data) {
  let sum = 0;
  let i = 0;
  for (let arr of data) {
    const a = arr[0];
    const b = arr[1];
    const bt = arr[2];
    bt.x += 10_000_000_000_000;
    bt.y += 10_000_000_000_000;
    const m = ((bt.y * a.x / a.y) - bt.x) / (((a.x * b.y) / a.y) - b.x);
    const n = (bt.x - m * b.x) / a.x;
    const score = m + n * 3;
    if (checkSolution(a, b, bt, m, n)) {
      sum += Math.round(score);
    }
  }
  return sum;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
