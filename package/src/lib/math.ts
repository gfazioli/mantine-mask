function clampValue(value: number, min: number, max: number) {
  if (max < min) {
    return (min + max) / 2;
  }

  return Math.min(Math.max(value, min), max);
}

export { clampValue };
