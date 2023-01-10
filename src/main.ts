import "./style.css";

const worldPath = document.getElementById("world");

const points: number[] = [250];
const maxPoints = 50;
const pointMax = 20;
let currentPoint = 0;
let mountainLen = 3;

const interpolateCos = (a: number, b: number, x: number) => {
  const ft = x * Math.PI;
  const f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
};

const makePathFromPoints = () => {
  return points.reduce((path, point, i) => {
    if (i === 0) path = `M 0, ${point}`;
    path += `L ${i * (500 / maxPoints)}, ${point}`;
    return path;
  }, "");
};

let p1 = Math.random();
let p2 = Math.random();
const getNextPerlinNoise = () => {
  let point;

  if (currentPoint % mountainLen === 0) {
    p1 = p2;
    p2 = Math.random();
    point = 500 / 2 + p1 * pointMax;
  } else {
    point =
      500 / 2 +
      interpolateCos(p1, p2, (currentPoint % mountainLen) / mountainLen) *
        pointMax;
  }

  points.unshift(point);
  currentPoint++;
};

const step = () => {
  getNextPerlinNoise();
  worldPath?.setAttribute("d", makePathFromPoints());
};

for (let i = 0; i < maxPoints; i++) {
  getNextPerlinNoise();
}

window.setInterval(step, 100);