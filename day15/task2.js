import fs from 'node:fs';

function readData(path) {
  const data = fs.readFileSync(path, { encoding: 'utf8' }).split('\n\n');
  data[1] = data[1].split('\n').join('');
  data[0] = data[0].split('\n').map(l => l.split(''));
  const newPlane = [];
  for (let y = 0; y < data[0].length; y++) {
    newPlane.push([]);
    for (const c of data[0][y]) {
      if (c === '#') {
        newPlane[y].push('#', '#');
      } else if (c === 'O') {
        newPlane[y].push('[', ']');
      } else {
        newPlane[y].push(c, '.');
      }
    }
  }
  data[0] = newPlane;
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
  if (xo === 0) {
    processYMove(plane, cp, yo);
  } else {
    processXMove(plane, cp, xo);
  }
}

function processXMove(plane, cp, xo) {
  const tp = {
    y: cp.y,
    x: cp.x
  };

  while ('[]@'.includes(plane[tp.y][tp.x])) {
    tp.x += xo;
  }

  if (plane[tp.y][tp.x] === '#')
    return;
  while (plane[tp.y][tp.x] !== '@') {
    plane[tp.y][tp.x] = plane[tp.y][tp.x - xo];
    tp.x -= xo;
  }
  plane[cp.y][cp.x] = '.';
  cp.x += xo;
}

function strBox(box) {
  return `${box.y},${box.x}`;
}

function boxStr(str) {
  const arr = str.split(',').map(n => parseInt(n));
  return { y: arr[0], x: arr[1] };
}

function processYMove(plane, cp, yo) {
  const includes = new Set();
  let toProcess = [];
  if (plane[cp.y + yo][cp.x] === '[') {
    const box = { y: cp.y + yo, x: cp.x }
    includes.add(strBox(box));
    toProcess.push(box);
  } else if (plane[cp.y + yo][cp.x] === ']') {
    const box = { y: cp.y + yo, x: cp.x - 1 }
    includes.add(strBox(box));
    toProcess.push(box);
  } else if (plane[cp.y + yo][cp.x] === '#')
    return;


  while (toProcess.length > 0) {
    let newProcess = [];
    for (const box of toProcess) {
      for (let i = 0; i <= 1; i++) {
        switch (plane[box.y + yo][box.x + i]) {
          case '[':
            const newBox = { y: box.y + yo, x: box.x + i };
            const str = strBox(newBox);
            if (!includes.has(str)) {
              includes.add(str);
              newProcess.push(newBox);
            }
            break;
          case ']':
            const newBox2 = { y: box.y + yo, x: box.x + i - 1 };
            const str2 = strBox(newBox2);
            if (!includes.has(str2)) {
              includes.add(str2);
              newProcess.push(newBox2);
            }
            break;
          case '#':
            return;
        }
      }
    }
    toProcess = newProcess;
  }

  for (const str of includes.values()) {
    const box = boxStr(str);
    plane[box.y][box.x] = '.';
    plane[box.y][box.x + 1] = '.';
  }

  for (const str of includes.values()) {
    const box = boxStr(str);
    plane[box.y + yo][box.x] = '[';
    plane[box.y + yo][box.x + 1] = ']';
  }

  plane[cp.y][cp.x] = '.';
  cp.y += yo;
  plane[cp.y][cp.x] = '@';
}

function calcScore(plane) {
  let score = 0;
  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      if (plane[y][x] === '[') {
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

const data = readData('data');
const solution = solve(data);
console.log(solution);
