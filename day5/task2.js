import fs from 'node:fs';

function readData(path) {
  let data = fs.readFileSync(path, { encoding: 'utf8' });
  data = data.split('\n\n').filter(l => l);
  return data;
}

function constructRuleArray(rules) {
  const arr = []; arr.length = 100;
  for (const rule of rules) {
    const nums = rule.split('|').filter(n => n).map(n => parseInt(n));
    if (!arr[nums[1]])
      arr[nums[1]] = [];
    arr[nums[1]].push(nums[0])
  }
  return arr;
}

function isBad(ruleArr, update) {
  const nums = update.split(',').map(n => parseInt(n));
  let forbidden = [];
  let hadBreak = false;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (forbidden.includes(num)) {
      hadBreak = true;
      for (let j = i - 1; j >= 0; j--) {
        if (ruleArr[nums[j]] && ruleArr[nums[j]].includes(nums[i])) {
          const temp = nums[j];
          nums[j] = nums[i];
          nums[i] = temp;
        }
      }
      i = 0;
      forbidden = [];
      continue;
    }
    if (ruleArr[num])
      forbidden = forbidden.concat(ruleArr[num]);
  }
  if (hadBreak) {
    return nums[Math.floor(nums.length / 2)];
  }
  return false;
}

function solve(data) {
  const rules = data[0].split('\n').filter(r => r);
  const updates = data[1].split('\n').filter(u => u);

  const ruleArr = constructRuleArray(rules);

  let result = 0;
  for (const update of updates) {
    const m = isBad(ruleArr, update);
    if (m)
      result += m;

  }

  return result;
}


const data = readData('data')
const solution = solve(data);
console.log(solution);
