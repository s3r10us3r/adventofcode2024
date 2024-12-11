import fs from 'node:fs';

function readData(path) {
  const data = fs.readFileSync(path, { encoding: 'utf8' }).split('');
  let id = 0;
  if (data[data.length - 1] === '\n')
    data.splice(data.length - 1, 1);
  let s = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      s.push({ type: 'file', size: parseInt(data[i]), id: id })
      id++;
    } else {
      s.push({ type: 'space', size: parseInt(data[i]) });
    }
  }
  return s;
}

function joinSpaces(i, data) {
  while (!!data[i - 1] && data[i - 1].type === 'space') {
    data[i].size += data[i - 1].size;
    data.splice(i - 1, 1);
    i--;
  }
  while (!!data[i + 1] && data[i + 1].type === 'space') {
    data[i].size += data[i + 1].size;
    data.splice(i + 1, 1);
  }
}

function moveFiles(data) {
  let l = 0;
  let r = data.length - 1;
  while (r !== 0) {
    if (l >= r) {
      l = 0;
      r--;
    }

    if (data[l].type !== 'space') {
      l++;
    }
    if (data[r].type !== 'file') {
      r--;
    }

    if (data[l].type === 'space' && data[r].type === 'file') {
      if (data[l].size === data[r].size) {
        const temp = data[l];
        data[l] = data[r];
        data[r] = temp;
        joinSpaces(r, data);
        l = 0;
        r--;
      } else if (data[l].size > data[r].size) {
        const file = data[r];
        data[l].size -= file.size;
        data.splice(l, 0, data[r]);
        data[r + 1] = { type: 'space', size: file.size };
        joinSpaces(r + 1, data);
        l = 0;
        r--;
      }
      else {
        l++;
      }
    }
  }
  return data;
}

function calculateCheckSum(data) {
  let checkSum = 0;
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'file') {
      for (let j = 0; j < data[i].size; j++) {
        checkSum += data[i].id * index;
        index++;
      }
    } else {
      index += data[i].size;
    }
  }
  return checkSum;
}

function solve(data) {
  data = moveFiles(data);
  const result = calculateCheckSum(data);
  return result;
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
