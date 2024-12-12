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
  const sides = new Set();
  let area = 0;
  const incArea = () => area++;
  const notify = (y, x, dir, os) => {
    sides.add(sideKey(y, x, dir, os));
  };
  flood(y, x, cr, data, incArea, notify);
  const sideNum = calcSides(sides);
  return sideNum * area;
}

function key(y, x) {
  return `${y},${x}`;
}

function sideKey(y, x, dir, os) {
  return `${y},${x},${dir},${os}`;
}

function revSideKey(key) {
  const arr = key.split(',');
  const y = parseInt(arr[0]);
  const x = parseInt(arr[1]);
  const dir = arr[2];
  const os = parseInt(arr[3]);
  return [y, x, dir, os];
}

function flood(y, x, cr, data, ia, not) {
  ia();
  seen.add(key(y, x));
  const dirs = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
  for (const dir of dirs) {
    let ty = dir[0];
    let tx = dir[1];
    if (ty < 0 || ty >= maxY || tx < 0 || tx >= maxX || data[ty][tx] !== cr) {
      let dir = ty === y ? 'y' : 'x';
      let offset = ty - y === 0 ? tx - x : ty - y;
      not(ty, tx, dir, offset);
    } else if (!seen.has(key(ty, tx))) {
      flood(ty, tx, cr, data, ia, not);
    }
  }
}

function calcSides(sides) {
  let sideCount = 0;
  while (sides.size > 0) {
    const elem = revSideKey(sides.values().next().value);
    let y = elem[0];
    let x = elem[1];
    let dir = elem[2];
    let offset = elem[3];
    sideCount += 1;
    removeSide(y, x, dir, sides, offset);
  }
  return sideCount;
}

function removeSide(y, x, d, sides, os) {
  if (d === 'y') {
    let diff = 1;
    while (sides.has(sideKey(y + diff, x, d, os))) {
      sides.delete(sideKey(y + diff, x, d, os));
      diff += 1;
    }
    diff = 1;
    while (sides.has(sideKey(y - diff, x, d, os))) {
      sides.delete(sideKey(y - diff, x, d, os));
      diff += 1;
    }
  } else {
    let diff = 1;
    while (sides.has(sideKey(y, x + diff, d, os))) {
      sides.delete(sideKey(y, x + diff, d, os));
      diff += 1;
    }
    diff = 1;
    while (sides.has(sideKey(y, x - diff, d, os))) {
      sides.delete(sideKey(y, x - diff, d, os));
      diff += 1;
    }
  }
  sides.delete(sideKey(y, x, d, os));
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
