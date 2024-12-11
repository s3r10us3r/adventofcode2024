import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' }).split(' ').filter(n => n).map(n => parseInt(n));
}

function solve(data) {
  for (let i = 0; i < 75; i++) {
    let arr = [];
    for (const rock of data) {
      if (rock === 0) {
        arr.push(1);
      } else if (Math.floor(Math.log10(rock)) % 2 === 1) {
        let str = rock.toString();
        arr.push(parseInt(str.slice(0, str.length / 2)));
        arr.push(parseInt(str.slice(str.length / 2, str.length)));
      }
      else {
        arr.push(rock * 2024);
      }
    }
    data = arr;
  }
  return data.length;
}

const data = readData('data')
const solution = solve(data);
console.log(solution);
