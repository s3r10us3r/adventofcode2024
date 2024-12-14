import fs from 'node:fs';
import { setTimeout } from "timers/promises";

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n')
    .filter(l => l)
    .map(l => l.split(' ').map(s => s.split('=')[1].split(',').map(num => parseInt(num))));
  return data;
}

function putDataOnGrid(data, width, height) {
  const plane = [];
  for (let i = 0; i < height; i++) {
    const arr = [];
    for (let j = 0; j < width; j++) {
      arr.push('.');
    }
    plane.push(arr);
  }

  for (const l of data) {
    const p = l[0];
    plane[p[1]][p[0]] = '*';
  }
  return plane;
}

function draw(plane) {
  console.clear();
  const dup = plane.map(arr => arr.join('')).join('\n');
  console.log(dup);
}

function checkNeighbour(plane) {
  let all = 0;
  let hasNeighbour = 0;
  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      if (plane[y][x] !== '*')
        continue;
      if (y > 0 && plane[y - 1][x] === '*') {
        hasNeighbour++;
      } else if (y < plane.length - 1 && plane[y + 1][x] === '*') {
        hasNeighbour++;
      }
      else if (x > 0 && plane[y][x - 1] === '*') {
        hasNeighbour++;
      }
      else if (x < plane[0].length - 1 && plane[y][x + 1] === '*') {
        hasNeighbour++;
      }
      all++;
    }
  }
  return hasNeighbour / all;
}

async function solve(data) {
  const width = 101;
  const height = 103;
  let step = 0;
  while (true) {
    for (let i = 0; i < data.length; i++) {
      let l = data[i];
      const p = l[0];
      const v = l[1];
      p[0] = (p[0] + v[0]) % width;
      p[0] = p[0] < 0 ? p[0] + width : p[0];
      p[1] = (p[1] + v[1]) % height;
      p[1] = p[1] < 0 ? p[1] + height : p[1];
    }
    const plane = putDataOnGrid(data, width, height);
    const nbs = checkNeighbour(plane);
    if (nbs >= 0.7) {
      draw(plane);
      console.log(step);
      await setTimeout(1000);
    }
    step++;
  }
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
