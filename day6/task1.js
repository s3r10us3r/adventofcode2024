import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data
    .split('\n')
    .filter(l => l)
    .map(l => l.split(''));
  return data;
}


function solve(data) {
  let gy = data.findIndex(l => l.includes('^'));
  let gx = data[gy].findIndex(e => e === '^');

  const maxY = data.length;
  const maxX = data[0].length;

  let xDir = 0;
  let yDir = -1;

  while ((gy + yDir >= 0 && gy + yDir < maxY) && (gx + xDir >= 0 && gx + xDir < maxX)) {
    if (data[gy + yDir][gx + xDir] === '#') {
      if (xDir === 0) {
        xDir = -yDir;
        yDir = 0;
      }
      else {
        yDir = xDir;
        xDir = 0;
      }
    }

    data[gy][gx] = 'X';
    gy += yDir;
    gx += xDir;
  }

  data = data.map(l => l.join('')).join('');
  const result = data.split('').filter(c => c === 'X').length + 1;
  return result;
}




const data = readData('data')
const solution = solve(data);
console.log(solution);

