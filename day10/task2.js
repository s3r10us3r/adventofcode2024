import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n').filter(l => l);
  data = data.map(l => l.split('').map(num => parseInt(num)));
  return data;
}

function findTrails(data, y, x, num) {
  if (num === 9)
    return 1;
  const maxY = data.length - 1;
  const maxX = data[0].length - 1;
  let trails = 0;
  if (y < maxY && data[y + 1][x] === num + 1) {
    trails += findTrails(data, y + 1, x, num + 1);
  }
  if (y > 0 && data[y - 1][x] === num + 1) {
    trails += findTrails(data, y - 1, x, num + 1);
  }
  if (x < maxX && data[y][x + 1] === num + 1) {
    trails += findTrails(data, y, x + 1, num + 1);
  }
  if (x > 0 && data[y][x - 1] === num + 1) {
    trails += findTrails(data, y, x - 1, num + 1);
  }
  return trails;
}

function solve(data) {
  let score = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] === 0) {
        score += findTrails(data, y, x, 0);
      }
    }
  }
  return score;
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
