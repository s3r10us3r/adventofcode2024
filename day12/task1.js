import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n').filter(l => l);
  return data;
}

const seen = new Set();
let maxY;
let maxX;
function floodBase(y, x, data) {
  const cr = data[y][x];
  let per = 0;
  let area = 0;
  const incPer = () => per++;
  const incArea = () => area++;
  flood(y, x, cr, data, incArea, incPer);
  return per * area;
}

function key(y, x) {
  return `${y},${x}`;
}

function flood(y, x, cr, data, ia, ip) {
  ia();
  seen.add(key(y, x));
  const dirs = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
  for (const dir of dirs) {
    let ty = dir[0];
    let tx = dir[1];
    if (ty < 0 || ty >= maxY || tx < 0 || tx >= maxX || data[ty][tx] !== cr) {
      ip();
    } else if (!seen.has(key(ty, tx))) {
      flood(ty, tx, cr, data, ia, ip);
    }
  }
}

function solve(data) {
  let sum = 0;
  maxY = data.length;
  maxX = data[0].length;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (seen.has(key(y, x))) {
        continue;
      }
      sum += floodBase(y, x, data);
    }
  }
  return sum;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
