function clampValue(value: number, min: number, max: number) {
  if (max < min) {
    return (min + max) / 2;
  }

  return Math.min(Math.max(value, min), max);
}

function parseAngleDegrees(angle: number | string | undefined, fallback: number) {
  if (typeof angle === 'number') {
    return angle;
  }

  if (typeof angle === 'string') {
    const trimmed = angle.trim();
    const numeric = Number.parseFloat(trimmed);
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  return fallback;
}

function normalizeFeather(feather: number) {
  const asPercent = feather <= 1 ? feather * 100 : feather;
  return clampValue(asPercent, 0, 100);
}

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

export { clampValue, getLinearCenterPercent, normalizeFeather, parseAngleDegrees };
