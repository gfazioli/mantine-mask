import { clampValue } from './math';

function getLinearCenterPercent(x: number, y: number, width: number, height: number, angleDeg: number) {
  if (width <= 0 || height <= 0) {
    return 50;
  }

  const theta = (angleDeg * Math.PI) / 180;
  const directionX = Math.sin(theta);
  const directionY = -Math.cos(theta);

  const project = (px: number, py: number) => px * directionX + py * directionY;

  const projections = [project(0, 0), project(width, 0), project(0, height), project(width, height)];

  const min = Math.min(...projections);
  const max = Math.max(...projections);
  const range = max - min;

  if (range <= 0) {
    return 50;
  }

  const t = project(x, y);
  return clampValue(((t - min) / range) * 100, 0, 100);
}

export { getLinearCenterPercent };
