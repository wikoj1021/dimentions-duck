let generationInterval: number;

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

  const MAX_POINTS =
    path.parentElement.clientWidth / (options?.resolution ?? 10);
  const FEATURE_LENGTH = options?.terrainFeatureLength ?? 3;
  const MAX_AMPLITUDE = options?.maxAmplitude ?? 20;

  const points: number[] = [250];
  let currentPoint = 0;

  const interpolateCos = (a: number, b: number, x: number) => {
    const ft = x * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return a * (1 - f) + b * f;
  };

  const makePathFromPoints = () => {
    return points.reduce((path, point, i) => {
      if (i === 0) path = `M 0, ${point}`;
      path += `L ${i * (500 / MAX_POINTS)}, ${point}`;
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

    points.unshift(point);
    currentPoint++;
  };

  const step = () => {
    getNextPerlinNoise();
    path?.setAttribute("d", makePathFromPoints());
  };

  for (let i = 0; i < MAX_POINTS; i++) {
    getNextPerlinNoise();
  }

  generationInterval = window.setInterval(
    step,
    options?.generationSpeed ?? 100
  );
  return generationInterval;
};

export const stopGeneration = () => {
  window.clearInterval(generationInterval);
};
