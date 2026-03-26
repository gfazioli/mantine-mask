const STEPS = 12;

/**
 * Attempt to use CSS `color()` smooth interpolation when supported,
 * falls back to multi-stop approximation.
 *
 * Smootherstep: zero 1st AND 2nd derivative at boundaries.
 * Creates an imperceptible transition at the edge of the solid zone.
 */
function smootherstep(t: number): number {
  return t * t * t * (t * (6 * t - 15) + 10);
}

function toRgba(opacity: number): string {
  if (opacity <= 0) {
    return 'transparent';
  }

  if (opacity >= 1) {
    return 'white';
  }

  return `rgba(255, 255, 255, ${opacity.toFixed(4)})`;
}

interface RadialGradientOptions {
  shape: string;
  radiusX: string;
  radiusY: string;
  x: string;
  y: string;
  start: number; // percentage 0-100
  end: number; // percentage 0-100
  invert: boolean;
}

export function generateSmoothedRadialGradient(options: RadialGradientOptions): string {
  const { radiusX, radiusY, x, y, start, end, invert } = options;
  const position = `ellipse ${radiusX} ${radiusY} at ${x} ${y}`;

  const stops: string[] = [];
  const range = end - start;

  if (range <= 0) {
    const solidColor = invert ? 'transparent' : 'white';
    const outsideColor = invert ? 'white' : 'transparent';
    stops.push(`${solidColor} ${start}%`);
    stops.push(`${outsideColor} ${start}%`);
  } else {
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const pct = start + range * t;
      // smootherstep maps t → eased opacity; at t=0 opacity=1, at t=1 opacity=0
      const easedOpacity = 1 - smootherstep(t);
      const opacity = invert ? 1 - easedOpacity : easedOpacity;
      stops.push(`${toRgba(opacity)} ${pct.toFixed(2)}%`);
    }
  }

  return `radial-gradient(${position}, ${stops.join(', ')})`;
}

interface LinearGradientOptions {
  angle: string;
  center: string;
  solidSize: string;
  fadeSize: string;
  invert: boolean;
}

export function generateSmoothedLinearGradient(options: LinearGradientOptions): string {
  const { angle, center, solidSize, fadeSize, invert } = options;

  // Generate a continuous bell curve across the full band width (center ± fadeSize).
  // The solid zone (center ± solidSize) stays at full opacity; the fade zones use smootherstep.
  // This avoids the single-point peak artifact when solidSize=0.

  const HALF_STEPS = STEPS;
  const stops: string[] = [];
  const outerColor = invert ? 'white' : 'transparent';

  // Left transparent zone
  stops.push(`${outerColor} 0`);
  stops.push(`${outerColor} calc(${center} - ${fadeSize})`);

  // Left half: from (center - fadeSize) to center — rising bell curve
  for (let i = 0; i <= HALF_STEPS; i++) {
    const t = i / HALF_STEPS; // 0 at outer edge, 1 at center
    // Map t to position within the left fade zone
    const pos = `calc(${center} - ${fadeSize} + ${fadeSize} * ${t.toFixed(4)})`;
    // Opacity: rises from 0 to 1 using smootherstep
    const easedOpacity = smootherstep(t);
    const opacity = invert ? 1 - easedOpacity : easedOpacity;
    stops.push(`${toRgba(opacity)} ${pos}`);
  }

  // Solid zone: from (center - solidSize) to (center + solidSize) at full opacity
  // Only add if solidSize > 0 to avoid duplicate stops at center
  const innerColor = invert ? 'transparent' : 'white';
  stops.push(`${innerColor} calc(${center} + ${solidSize})`);

  // Right half: from center to (center + fadeSize) — falling bell curve
  for (let i = 0; i <= HALF_STEPS; i++) {
    const t = i / HALF_STEPS; // 0 at center, 1 at outer edge
    const pos = `calc(${center} + ${fadeSize} * ${t.toFixed(4)})`;
    const easedOpacity = 1 - smootherstep(t);
    const opacity = invert ? 1 - easedOpacity : easedOpacity;
    stops.push(`${toRgba(opacity)} ${pos}`);
  }

  // Right transparent zone
  stops.push(`${outerColor} calc(${center} + ${fadeSize})`);
  stops.push(`${outerColor} 100%`);

  return `linear-gradient(${angle}, ${stops.join(', ')})`;
}
