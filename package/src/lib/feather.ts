import { clampValue } from './math';

function normalizeFeather(feather: number) {
  const asPercent = feather <= 1 ? feather * 100 : feather;
  return clampValue(asPercent, 0, 100);
}

export { normalizeFeather };
