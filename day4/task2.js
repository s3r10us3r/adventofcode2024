import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {
  const chars = data.split('\n').map(line => line.split(''));
  const dots = chars.map(line => line.map(_ => '.'));

  let counter = 0;

  const slideMask = (mask) => {
    const yCap = Math.max(mask.map(e => e[0]));
    const xCap = Math.max(mask.map(e => e[1]))

    const height = chars.length;
    const width = chars[0].length;

    for (let y = 0; y < height - yCap; y++)
      for (let x = 0; x < width - xCap; x++) {
        const word = mask.map(c => chars[c[0] + y][c[1] + x]).join('');
        if (word === 'SSAMM' || word === 'MMASS' || word === 'MSAMS' || word === 'SMASM') {
          counter++;
          mask.forEach((c, i) => dots[c[0] + y][c[1] + x] = word[i]);
        }
      }
  }


  const mask = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]];
  slideMask(mask);
  dots.map(line => line.join('')).forEach(line => console.log(line));
  return counter;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);

