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

function isGood(ruleArr, update) {
  const nums = update.split(',').map(n => parseInt(n));
  let forbidden = [];
  for (const num of nums) {
    if (forbidden.includes(num))
      return false;

    if (ruleArr[num])
      forbidden = forbidden.concat(ruleArr[num]);

  }
  return nums[Math.floor(nums.length / 2)];
}

function solve(data) {
  const rules = data[0].split('\n').filter(r => r);
  const updates = data[1].split('\n').filter(u => u);

  const ruleArr = constructRuleArray(rules);

  let result = 0;
  for (const update of updates) {
    const m = isGood(ruleArr, update);
    if (m)
      result += m;

  }

  return result;
}




const data = readData('data')
const solution = solve(data);
console.log(solution);

