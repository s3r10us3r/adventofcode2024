import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n').filter(l => l);
  return data;
}

function solve(data) {
  const maxY = data.length;
  const maxX = data[0].length;

  var antennaDict = {};

  for (let y = 0; y < maxY; y++)
    for (let x = 0; x < maxX; x++) {
      const c = data[y][x];
      if (c !== '.') {
        if (c in antennaDict) {
          antennaDict[c].push({ y: y, x: x });
        } else {
          antennaDict[c] = [{ y: y, x: x }];
        }
      }
    }

  const antinodeSet = new Set();

  for (const [c, v] of Object.entries(antennaDict)) {
    for (let i = 0; i < v.length - 1; i++) {
      for (let j = i + 1; j < v.length; j++) {
        const vec = { y: v[j].y - v[i].y, x: v[j].x - v[i].x };
        let p = { y: v[j].y, x: v[j].x };
        while (p.y >= 0 && p.y < maxY && p.x >= 0 && p.x < maxX) {
          antinodeSet.add(p.y * 1000 + p.x);
          p.y += vec.y;
          p.x += vec.x;
        }
        p = { y: v[i].y, x: v[i].x };
        while (p.y >= 0 && p.y < maxY && p.x >= 0 && p.x < maxX) {
          antinodeSet.add(p.y * 1000 + p.x);
          p.y -= vec.y;
          p.x -= vec.x;
        }
      }
    }
  }

  return antinodeSet.size;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
