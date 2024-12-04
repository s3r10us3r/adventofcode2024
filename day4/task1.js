import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  const chars = data.split('\n').map(line => line.split(''));
  const dots = chars.map(line => line.map(_ => '.'));

  let counter = 0;

  const slideMask = (mask, yCap, xCap) => {
    const height = chars.length;
    const width = chars[0].length;

    for (let y = 0; y < height - yCap; y++)
      for (let x = 0; x < width - xCap; x++) {
        const word = mask.map(c => chars[c[0] + y][c[1] + x]).join('');
        if (word === 'XMAS' || word === 'SAMX') {
          counter++;
          mask.forEach((c, i) => dots[c[0] + y][c[1] + x] = word[i]);
        }
      }
  }

  const horizontalMask = [[0, 0], [0, 1], [0, 2], [0, 3]];
  const verticalMask = [[0, 0], [1, 0], [2, 0], [3, 0]];
  const diagonalMask1 = [[0, 0], [1, 1], [2, 2], [3, 3]]
  const diagonalMask2 = [[0, 3], [1, 2], [2, 1], [3, 0]]

  slideMask(horizontalMask, 0, 3);
  slideMask(verticalMask, 3, 0);
  slideMask(diagonalMask1, 3, 3);
  slideMask(diagonalMask2, 3, 3);
  dots.map(line => line.join('')).forEach(line => console.log(line));
  return counter;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);

