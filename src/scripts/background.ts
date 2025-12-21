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
let running = true;

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const lineToPoints = (l: Line, startWithX: boolean = true): Points => {
  if (startWithX) {
    const x0 = 0;
    const x1 = w;
    const y0 = l.m * x0 + l.b;
    const y1 = l.m * x1 + l.b;
    return { x0, x1, y0, y1 };
  } else {
    const y0 = 0;
    const y1 = h;
    const x0 = (y0 - l.b) / l.m;
    const x1 = (y1 - l.b) / l.m;
    return { x0, x1, y0, y1 };
  }
};

const isVisible = (l: Line): boolean => {
  const { y0, y1 } = lineToPoints(l);
  const { x0, x1 } = lineToPoints(l, false);
  return (
    (y0 > 0 && y0 < h) ||
    (y1 > 0 && y1 < h) ||
    (x0 > 0 && x0 < w) ||
    (x1 > 0 && x1 < w)
  );
};

const getRandomLine = (i: number, oldLine?: Line): Line => {
  const k = numLines * 0.07;
  const theta = (((i + k) / (numLines + 2 * k)) * Math.PI) / 2;
  const m = Math.tan(i % 2 === 0 ? theta : theta + Math.PI / 2);

  const minIntercept = m > 0 ? -m * w : 0;
  const maxIntercept = m > 0 ? h : h - m * w;

  if (!oldLine) {
    const b = getRandomInt(minIntercept, maxIntercept);
    const maxSpeed = Math.floor(Math.min(w, h) / 400);
    let deltaB = getRandomInt(1, maxSpeed + 1) * 0.5;
    if (Math.floor(Math.random() * 2) === 0) deltaB *= -1;
    const deltaM = 0;
    return { m, b, deltaM, deltaB };
  } else {
    let b: number;
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

const initializeLines = (): void => {
  positions = Array.from({ length: numLines }, (_, i) => getRandomLine(i));
};

const updateLines = (): void => {
  positions = positions.map((l, i) => {
    let newLine = updateLine(l);
    if (!isVisible(newLine)) {
      newLine = getRandomLine(i, l);
    }
    return newLine;
  });
};

const drawLines = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 0.5 * window.devicePixelRatio;
  ctx.beginPath();
  positions.forEach((l) => {
    const p = lineToPoints(l);
    ctx.moveTo(p.x0, p.y0);
    ctx.lineTo(p.x1, p.y1);
  });
  ctx.stroke();
};

const init = (): void => {
  const canvas = document.getElementById('background-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const fps = 60;
  const interval = (1 / fps) * 1000;

  const updateCanvasSize = (): void => {
    const dpr = window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    w = canvas.width;
    h = canvas.height;
    ctx.scale(dpr, dpr);
    initializeLines();
  };

  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      running = !running;
    }
  });

  let lastRenderTime = 0;

  const animate = (currentTime: number): void => {
    requestAnimationFrame(animate);

    if (!running) return;
    if (currentTime - lastRenderTime < interval) return;

    lastRenderTime = currentTime;
    updateLines();
    drawLines(ctx);
  };

  requestAnimationFrame(animate);
};

document.addEventListener('DOMContentLoaded', init);
