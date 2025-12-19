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

export { parseAngleDegrees };
