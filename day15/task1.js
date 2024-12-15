import fs from 'node:fs';

function readData(path) {
  const data = fs.readFileSync(path, { encoding: 'utf8' }).split('\n\n');
  data[1] = data[1].split('\n').join('');
  data[0] = data[0].split('\n').map(l => l.split(''));
  return data;
}

function findCp(plane) {
  const cp = {
    y: 0,
    c: 0
  }
  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      if (plane[y][x] === '@') {
        cp.y = y;
        cp.x = x;
        return cp;
      }
    }
  }
}

function processMove(plane, move, cp) {
  let xo = 0;
  let yo = 0;
  switch (move) {
    case '<':
      xo = -1;
      break;
    case '^':
      yo = -1;
      break;
    case '>':
      xo = 1;
      break;
    case 'v':
      yo = 1;
      break;
  }

  const tp = {
    x: cp.x,
    y: cp.y
  };

  while (plane[tp.y][tp.x] === 'O' || plane[tp.y][tp.x] === '@') {
    tp.y += yo;
    tp.x += xo;
  }

  if (plane[tp.y][tp.x] === '#')
    return;

  while (plane[tp.y][tp.x] !== '@') {
    plane[tp.y][tp.x] = plane[tp.y - yo][tp.x - xo];
    tp.y -= yo;
    tp.x -= xo;
  }
  plane[cp.y][cp.x] = '.';
  cp.y += yo;
  cp.x += xo;
}

function calcScore(plane) {
  let score = 0;
  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      if (plane[y][x] === 'O') {
        score += 100 * y + x;
      }
    }
  }
  return score;
}

function solve(data) {
  const plane = data[0];
  const moves = data[1];
  const cp = findCp(plane);
  for (const move of moves) {
    processMove(plane, move, cp);
  }
  return calcScore(plane);
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
