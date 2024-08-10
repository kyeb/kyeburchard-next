interface Line {
  m: number; // slope
  b: number; // intercept
  deltaM: number;
  deltaB: number;
}

interface Points {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const numLines = 30;
let positions: Line[] = [];
let w = 0;
let h = 0;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const lineToPoints = (l: Line, startWithX: boolean = true): Points => {
  if (startWithX) {
    // use y = m * x + b
    const x0 = 0;
    const x1 = w;
    const y0 = l.m * x0 + l.b;
    const y1 = l.m * x1 + l.b;
    return { x0, x1, y0, y1 };
  } else {
    // use x = (y - b) / m
    const y0 = 0;
    const y1 = h;
    const x0 = (y0 - l.b) / l.m;
    const x1 = (y1 - l.b) / l.m;
    return { x0, x1, y0, y1 };
  }
};

const isVisible = (l: Line) => {
  // compute extremes in all 4 directions
  const { y0, y1 } = lineToPoints(l);
  const { x0, x1 } = lineToPoints(l, false);
  // if any of the 4 are within the x/y limits of the screen, it's visible
  return (
    (y0 > 0 && y0 < h) ||
    (y1 > 0 && y1 < h) ||
    (x0 > 0 && x0 < w) ||
    (x1 > 0 && x1 < w)
  );
};

const getRandomLine = (i: number, oldLine?: Line): Line => {
  const k = numLines * 0.07; // no lines within 7% of vertical/horizontal

  // theta between ~0 and ~pi/2
  const theta = (((i + k) / (numLines + 2 * k)) * Math.PI) / 2;
  const m = Math.tan(i % 2 === 0 ? theta : theta + Math.PI / 2);

  // solve for b at each corner on the non y-axis side (at w, 0 and w, h)
  const minIntercept = m > 0 ? -m * w : 0;
  const maxIntercept = m > 0 ? h : h - m * w;
  if (!oldLine) {
    const b = getRandomInt(minIntercept, maxIntercept);
    // maxSpeed is based on screen dimensions for a more consistent feel across devices
    const maxSpeed = Math.floor(Math.min(w, h) / 400);
    // compute a positive non-zero speed, then randomly negate it to avoid 0 velocity possibility
    // TODO: re-reading this years after writing it, it seems like this could be simplified a lot...
    let deltaB = getRandomInt(1, maxSpeed + 1) * 0.5;
    if (Math.floor(Math.random() * 2) == 0) deltaB *= -1;
    const deltaM = 0;
    return { m, b, deltaM, deltaB };
  } else {
    let b;
    if (oldLine.deltaB > 0) {
      b = minIntercept + 1;
    } else {
      b = maxIntercept - 1;
    }
    return { ...oldLine, m, b };
  }
};

const updateLine = (l: Line): Line => {
  return { ...l, m: l.m + l.deltaM, b: l.b + l.deltaB };
};

export const updateDims = (width: number, height: number) => {
  w = width;
  h = height;
};

export const initializeLines = () => {
  positions = Array.from({ length: numLines }, (_, i) => getRandomLine(i));
};

export const updateLines = () => {
  const newPositions: Line[] = positions.map((l, i) => {
    // off screen condition
    let newLine = updateLine(l);
    if (!isVisible(newLine)) {
      newLine = getRandomLine(i, l);
    }
    return newLine;
  });

  positions = newPositions;
};

export const drawLines = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.5 * window.devicePixelRatio;
  ctx.beginPath();
  positions.forEach((l, i) => {
    const p = lineToPoints(l);
    ctx.moveTo(p.x0, p.y0);
    ctx.lineTo(p.x1, p.y1);
  });
  ctx.stroke();
};
