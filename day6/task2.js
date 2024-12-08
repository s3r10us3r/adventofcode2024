import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data
    .split('\n')
    .filter(l => l)
    .map(l => l.split(''));
  return data;
}


function nextDir(dir) {
  return dir.x === 0 ? { y: 0, x: -dir.y }
    : { y: dir.x, x: 0 };
}

function isStepOutOfBounds(pos, maxX, maxY) {
  return !(pos.y >= 0 && pos.y < maxY && pos.x >= 0 && pos.x < maxX);
}

function display(data, mark) {
  const temp = data[mark.y][mark.x];
  data[mark.y][mark.x] = 'O';
  for (const line of data) {
    console.log(line.join(''));
  }
  data[mark.y][mark.x] = temp;
}

function hashDirectionPosition(dir, pos) {
  let num = pos.y * 1_000_000 + pos.x * 100 + (dir.x + dir.y + 2) * (dir.x === 0 ? 3 : 7);
  return num;
}

function doesCreateCycle(rockPos, initPos, data, maxX, maxY) {
  let dir = {
    y: -1,
    x: 0
  }

  let pos = {
    x: initPos.x,
    y: initPos.y
  };

  let visited = new Set();
  while (!isStepOutOfBounds({ x: pos.x + dir.x, y: pos.y + dir.y }, maxX, maxY)) {
    while (data[pos.y + dir.y][pos.x + dir.x] === '#' || (pos.x + dir.x === rockPos.x && pos.y + dir.y === rockPos.y)) {
      dir = nextDir(dir);
    }

    const hash = hashDirectionPosition(dir, pos);
    if (visited.has(hash)) {
      return true;
    }
    visited.add(hash);
    pos.x += dir.x;
    pos.y += dir.y;
  }
  return false;
}

function solve(data) {
  const ty = data.findIndex(l => l.includes('^'));
  const tx = data[ty].findIndex(e => e === '^');
  const pos = {
    y: ty,
    x: tx
  };

  const initPos = {
    y: ty,
    x: tx
  };

  const maxY = data.length;
  const maxX = data[0].length;
  let dir = {
    y: -1,
    x: 0
  }

  const pathHash = new Set();
  const path = [];
  while (!isStepOutOfBounds({ x: pos.x + dir.x, y: pos.y + dir.y }, maxX, maxY)) {
    while (data[pos.y + dir.y][pos.x + dir.x] === '#') {
      dir = nextDir(dir);
    }

    pos.y += dir.y;
    pos.x += dir.x;
    const hash = pos.x * 100_000_000 + pos.y;
    if (!pathHash.has(hash)) {
      path.push({ y: pos.y, x: pos.x });
      pathHash.add(hash);
    }
  }
  const result = path.reduce((total, v) => doesCreateCycle(v, initPos, data, maxX, maxY) ? total + 1 : total, 0);
  return result;
}



const data = readData('data')
const solution = solve(data);
console.log(solution);

