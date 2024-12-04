import fs from 'node:fs';

function readData(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function solve(data) {

}

const data = readData('test')
const solution = solve(data);
console.log(solution);

