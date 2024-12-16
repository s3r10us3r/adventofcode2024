import fs from 'node:fs';

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftIndex(i) { return 2 * i + 1 };
  getRightIndex(i) { return 2 * i + 2 };

  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (this.heap[currentIndex][1] < this.heap[parentIndex][1]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return top;
  }

  heapifyDown(index) {
    let currentIndex = index;
    const length = this.heap.length;
    const left = this.getLeftIndex(currentIndex);
    const right = this.getRightIndex(currentIndex);
    let smallest = currentIndex;

    if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
      smallest = left;
    }

    if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
      smallest = right;
    }

    if (smallest !== currentIndex) {
      this.swap(currentIndex, smallest);
      this.heapifyDown(smallest);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function readData(path) {
  const map = fs.readFileSync(path, { encoding: 'utf8' })
    .split('\n')
    .filter(l => l)
    .map(l => l.split(''));
  const s = { y: -1, x: -1 };
  const e = { y: -1, x: -1 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'S') {
        s.y = y;
        s.x = x;
      } else if (map[y][x] === 'E') {
        e.y = y;
        e.x = x;
      }
    }
  }
  return [map, s, e];
}

function posString(pos) {
  return `${pos.y},${pos.x},${pos.dir}`;
}

function turnPos(pos, dir) {
  return { x: pos.x, y: pos.y, dir: (pos.dir + dir + 360) % 360 };
}

function movePos(pos) {
  const newPos = { x: pos.x, y: pos.y, dir: pos.dir };
  switch (newPos.dir) {
    case 0:
      newPos.y -= 1;
      return newPos;
    case 90:
      newPos.x += 1;
      return newPos;
    case 180:
      newPos.y += 1;
      return newPos;
    case 270:
      newPos.x -= 1;
      return newPos;
  }
}

function isWall(map, pos) {
  return map[pos.y][pos.x] === '#';
}

function dijkstra(s, e, map) {
  const distMap = new Map();
  const pq = new PriorityQueue();
  pq.push([s, 0]);
  while (!pq.isEmpty()) {
    const [node, val] = pq.pop();
    const directions = [
      [movePos(turnPos(node, -90)), 1001],
      [movePos(turnPos(node, 90)), 1001],
      [movePos(node), 1],
    ]
    for (const [child, childdist] of directions) {
      if (isWall(map, child))
        continue;
      const dist = val + childdist;
      if (child.y === e.y && child.x === e.x) {
        return dist;
      }
      const childStr = posString(child);
      if (!distMap.has(childStr) || distMap.get(childStr) > dist) {
        pq.push([child, dist]);
        distMap.set(childStr, dist);
      }
    }
  }
}

function solve(data) {
  const [map, s, e] = data;
  s.dir = 90;
  return dijkstra(s, e, map);
}

const data = readData('data');
const solution = solve(data);
console.log(solution);
