let generationInterval: number;

const ADDITIONAL_FEATURE_CHANCES = {
  HOLE: 0.05,
  HOLE_EXTENSION: 0.4,
  MAX_HOLE_EXTENSION: 10,
  MIN_HOLE_EXTENSION: 4,
  MIN_DISTANCE_BETWEEN_HOLES: 15,
};

const DEFAULT_RESOLUTION = 10;
const DEFAULT_FEATURE_LEN = 3;
const DEFAULT_AMPLITUDE = 20;
const PATH_SPEED = 777;

export const startGeneration = (
  path: SVGPathElement,
  options?: {
    resolution?: number;
    maxAmplitude?: number;
    terrainFeatureLength?: number;
    generationSpeed?: number;
  }
) => {
  if (!path.parentElement) return;

  const svgElement = path.parentElement;

  const RESOLUTION = options?.resolution ?? DEFAULT_RESOLUTION;
  const MAX_POINTS = path.parentElement.clientWidth / RESOLUTION + 2;
  const FEATURE_LENGTH = options?.terrainFeatureLength ?? DEFAULT_FEATURE_LEN;
  const MAX_AMPLITUDE = options?.maxAmplitude ?? DEFAULT_AMPLITUDE;

  const points: number[] = [svgElement.clientHeight / 2];
  let currentPoint = 0;
  let generatingHole = false;
  let currentHoleSize = 0;
  let lastHoleDistance = 0;

  const interpolateCos = (a: number, b: number, x: number) => {
    const ft = x * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return a * (1 - f) + b * f;
  };

  const makePathFromPoints = () => {
    return points.reduce((path, point, i) => {
      if (i === 0) path = `M 0, ${point}`;
      path += `L ${RESOLUTION * i}, ${point}`;
      return path;
    }, "");
  };

  let p1 = Math.random();
  let p2 = Math.random();
  const getNextPerlinNoise = () => {
    let point;

    if (currentPoint % FEATURE_LENGTH === 0) {
      p1 = p2;
      p2 = Math.random();
      point = 500 / 2 + p1 * MAX_AMPLITUDE;
    } else {
      point =
        500 / 2 +
        interpolateCos(
          p1,
          p2,
          (currentPoint % FEATURE_LENGTH) / FEATURE_LENGTH
        ) *
          MAX_AMPLITUDE;
    }

    points.push(point);
    currentPoint++;
  };

  const holeGeneration = () => {
    if (currentHoleSize > ADDITIONAL_FEATURE_CHANCES.MAX_HOLE_EXTENSION) {
      generatingHole = false;
      currentHoleSize = 0;
    } else if (generatingHole) {
      generatingHole =
        currentHoleSize < ADDITIONAL_FEATURE_CHANCES.MIN_HOLE_EXTENSION ||
        Math.random() <= ADDITIONAL_FEATURE_CHANCES.HOLE_EXTENSION;
    } else if (
      lastHoleDistance > ADDITIONAL_FEATURE_CHANCES.MIN_DISTANCE_BETWEEN_HOLES
    ) {
      generatingHole = Math.random() < ADDITIONAL_FEATURE_CHANCES.HOLE;
    }

    if (generatingHole) {
      points.push(500);
      currentHoleSize++;
      lastHoleDistance = 0;
    } else {
      currentHoleSize = 0;
      lastHoleDistance++;
    }
  };

  const step = () => {
    points.shift();
    holeGeneration();
    if (!generatingHole) getNextPerlinNoise();
    path?.setAttribute("d", makePathFromPoints());
  };

  for (let i = 0; i < MAX_POINTS; i++) {
    getNextPerlinNoise();
  }
  path?.setAttribute("d", makePathFromPoints());

  let lastTime = Date.now();
  const translatePath = () => {
    const time = Date.now();
    const timeElapsed = time - lastTime;
    let translation = (PATH_SPEED * timeElapsed) / 1000;

    if (translation >= RESOLUTION) lastTime = time;

    while (translation >= RESOLUTION) {
      step();
      translation -= RESOLUTION;
    }

    // console.log(translation);

    path.setAttribute('transform', `translate(${-translation}, 0)`)

    window.requestAnimationFrame(translatePath);
  };

  window.requestAnimationFrame(translatePath);
  return generationInterval;
};

export const stopGeneration = () => {
  window.clearInterval(generationInterval);
};
