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

  // Structure: transparent → [eased fade] → solid zone → [eased fade] → transparent
  // Left fade:  (center - fadeSize) to (center - solidSize)
  // Solid zone: (center - solidSize) to (center + solidSize)
  // Right fade: (center + solidSize) to (center + fadeSize)

  const stops: string[] = [];
  const outerColor = invert ? 'white' : 'transparent';
  const innerColor = invert ? 'transparent' : 'white';

  // Left transparent zone
  stops.push(`${outerColor} 0`);
  stops.push(`${outerColor} calc(${center} - ${fadeSize})`);

  // Left fade: (center - fadeSize) to (center - solidSize)
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const pos = `calc(${center} - ${fadeSize} + (${fadeSize} - ${solidSize}) * ${t.toFixed(4)})`;
    const easedOpacity = smootherstep(t);
    const opacity = invert ? 1 - easedOpacity : easedOpacity;
    stops.push(`${toRgba(opacity)} ${pos}`);
  }

  // Solid zone
  stops.push(`${innerColor} calc(${center} - ${solidSize})`);
  stops.push(`${innerColor} calc(${center} + ${solidSize})`);

  // Right fade: (center + solidSize) to (center + fadeSize)
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const pos = `calc(${center} + ${solidSize} + (${fadeSize} - ${solidSize}) * ${t.toFixed(4)})`;
    const easedOpacity = 1 - smootherstep(t);
    const opacity = invert ? 1 - easedOpacity : easedOpacity;
    stops.push(`${toRgba(opacity)} ${pos}`);
  }

  // Right transparent zone
  stops.push(`${outerColor} calc(${center} + ${fadeSize})`);
  stops.push(`${outerColor} 100%`);

  return `linear-gradient(${angle}, ${stops.join(', ')})`;
}
