interface Line {
  m: number; // slope
  b: number; // intercept
  // deltaM: number;
  // deltaB: number;
}

interface Points {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const numLines = 30;
let positions: Line[] = [];
const maxSpeed = 5;
let w = 0;
let h = 0;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const lineToPoints = (l: Line): Points => {
  const x0 = 0;
  const y0 = l.m * x0 + l.b;
  const x1 = w;
  const y1 = l.m * x1 + l.b;
  return { x0, x1, y0, y1 };
};

const isVisible = (l: Line) => {
  const { x0, y0, x1, y1 } = lineToPoints(l);
  return true;
};

const getRandomLine = (i: number): Line => {
  const k = numLines * 0.07; // no lines within 7% of vertical/horizontal

  // theta between ~0 and ~pi/2
  const theta = (((i + k) / (numLines + 2 * k)) * Math.PI) / 2;
  const m = Math.tan(i % 2 === 0 ? theta : theta + Math.PI / 2);

  // solve for b at each corner on the non y-axis side (at w, 0 and w, h)
  const minIntercept = m > 0 ? -m * w : 0;
  const maxIntercept = m > 0 ? h : h - m * w;
  const b = getRandomInt(minIntercept, maxIntercept);
  return { m, b };
};

export const updateDims = (width: number, height: number) => {
  w = width;
  h = height;
};

export const initializeLines = () => {
  positions = Array.from({ length: numLines }, (_, i) => getRandomLine(i));
};

export const updateLines = (width: number, height: number) => {
  const newPositions: Line[] = positions.map((l, i) => {
    // off screen condition
    let newLine;
    if (!isVisible(l)) {
      newLine = getRandomLine(i);
    } else {
      newLine = l;
    }
    return newLine;
  });

  positions = newPositions;
};

export const drawLines = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  positions.forEach((l) => {
    const p = lineToPoints(l);
    ctx.moveTo(p.x0, p.y0);
    ctx.lineTo(p.x1, p.y1);
  });
  ctx.stroke();
};
