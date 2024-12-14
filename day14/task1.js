import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n').filter(l => l).map(l => l.split(' ').map(s => s.split('=')[1].split(',').map(num => parseInt(num))));
  return data;
}

function solve(data) {
  const width = 101;
  const height = 103;
  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);
  const steps = 100;
  const quadrants = [0, 0, 0, 0];
  for (const l of data) {
    const p = l[0];
    const v = l[1];
    let finalX = (p[0] + steps * v[0]) % width;
    finalX = finalX < 0 ? finalX + width : finalX;
    let finalY = (p[1] + steps * v[1]) % height;
    finalY = finalY < 0 ? finalY + height : finalY;

    if (finalX !== middleX && finalY !== middleY) {
      let quadrant = 0;
      if (finalX > middleX)
        quadrant += 1;
      if (finalY > middleY)
        quadrant += 2;
      quadrants[quadrant] += 1;
    }
  }

  let res = 1;
  for (let q of quadrants) {
    res *= q;
  }
  return res;
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
