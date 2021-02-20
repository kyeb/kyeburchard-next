interface Line {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  dirX: number;
  dirY: number;
}

const numLines = 30;
let positions: Line[] = [];
const maxSpeed = 5;

const getRandomLine = (w: number, h: number): Line => {
  return {
    x0: Math.floor(Math.random() * w),
    y0: Math.floor(Math.random() * h),
    x1: Math.floor(Math.random() * w),
    y1: Math.floor(Math.random() * h),
    // between -1 and 1
    dirX: maxSpeed * (Math.random() - 0.5),
    dirY: maxSpeed * (Math.random() - 0.5),
  };
};

const lineIsInteresting = (line: Line, w: number, h: number) => {
  if (Math.abs(line.x0 - line.x1) < w * 0.05) return false;
  if (Math.abs(line.y0 - line.y1) < h * 0.05) return false;
  return true;
};

export const initializeLines = (w: number, h: number) => {
  positions = Array.from({ length: numLines }, (v, i) => {
    let line;
    do {
      line = getRandomLine(w, h);
      const direction = Math.floor(i % 6);
      switch (direction) {
        // ↗
        case 0:
          line.x0 = 0;
          line.y1 = 0;
          break;
        // →
        case 1:
          line.x0 = 0;
          line.x1 = w;
          break;
        // ↘
        case 2:
          line.x0 = 0;
          line.y1 = h;
          break;
        // ↘
        case 3:
          line.y0 = 0;
          line.x1 = w;
          break;
        // ↑
        case 4:
          line.y0 = 0;
          line.y1 = h;
          break;
        // ↗
        case 5:
          line.x0 = w;
          line.y1 = h;
          break;
      }
    } while (!lineIsInteresting(line, w, h));

    return line;
  });
};

export const updateLines = (width: number, height: number) => {
  const newX = (x: number, dir: number) => {
    if (x <= 0) return 0;
    else if (x >= width) return width;
    else return x + dir;
  };
  const newY = (y: number, dir: number) => {
    if (y <= 0) return 0;
    else if (y >= height) return height;
    else return y + dir;
  };

  const newXY = (l: Line) => ({
    ...l,
    x0: newX(l.x0, l.dirX),
    y0: newY(l.y0, l.dirY),
    x1: newX(l.x1, l.dirX),
    y1: newY(l.y1, l.dirY),
  });

  const newPositions: Line[] = positions.map((l) => {
    // off screen condition
    const nextLine = newXY(newXY(l));
    if (
      (nextLine.x0 === 0 && nextLine.y0 == 0) ||
      (nextLine.x0 === width && nextLine.y0 == 0) ||
      (nextLine.x0 === 0 && nextLine.y0 == height) ||
      (nextLine.x0 === width && nextLine.y0 == height) ||
      (nextLine.x1 === 0 && nextLine.y1 == 0) ||
      (nextLine.x1 === width && nextLine.y1 == 0) ||
      (nextLine.x1 === 0 && nextLine.y1 == height) ||
      (nextLine.x1 === width && nextLine.y1 == height)
    ) {
      l.dirX = -l.dirX;
      l.dirY = -l.dirY;
      return newXY(l);
    }
    return newXY(l);
  });

  positions = newPositions;
  console.log(positions[0].dirX);
};

export const drawLines = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  positions.forEach((p) => {
    ctx.moveTo(p.x0, p.y0);
    ctx.lineTo(p.x1, p.y1);
  });
  ctx.stroke();
};
