import { useEffect, useRef, useState } from "react";
import styles from "../styles/Background.module.css";

interface Line {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  dirX: number;
  dirY: number;
}

let fps = 60;
let interval = (1 / fps) * 1000; // ms

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep canvas sizing in sync with window dimensions
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [initialPositions, setInitialPositions] = useState<Line[] | null>(null);

  const updateWindowSize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWindowSize();
    window.addEventListener("load", updateWindowSize);
    window.addEventListener("resize", updateWindowSize);
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const newX = (x: number, dir: number) => {
      if (x === 0 || x === width) return x;
      else return x + ((dir * frameCount) % width);
    };
    const newY = (y: number, dir: number) => {
      if (y === 0 || y === height) return y;
      else return y + ((dir * frameCount) % height);
    };
    const positions = initialPositions?.map((l) => ({
      x0: newX(l.x0, l.dirX),
      y0: newY(l.y0, l.dirY),
      x1: newX(l.x1, l.dirX),
      y1: newY(l.y1, l.dirY),
    }));

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    positions?.forEach((p) => {
      ctx.moveTo(p.x0, p.y0);
      ctx.lineTo(p.x1, p.y1);
    });
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const getRandomLine = (): Line => {
      return {
        x0: Math.floor(Math.random() * width),
        y0: Math.floor(Math.random() * height),
        x1: Math.floor(Math.random() * width),
        y1: Math.floor(Math.random() * height),
        // -1, 0, or 1
        dirX: Math.floor(Math.random() * 3) - 1,
        dirY: Math.floor(Math.random() * 3) - 1,
      };
    };

    const lineIsInteresting = (line: Line) => {
      if (Math.abs(line.x0 - line.x1) < width * 0.05) return false;
      if (Math.abs(line.y0 - line.y1) < width * 0.05) return false;
      return true;
    };

    const numLines = 30;
    const positions: Line[] = Array.from({ length: numLines }, (v, i) => {
      let line;
      do {
        line = getRandomLine();
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
            line.x1 = width;
            break;
          // ↘
          case 2:
            line.x0 = 0;
            line.y1 = height;
            break;
          // ↘
          case 3:
            line.y0 = 0;
            line.x1 = width;
            break;
          // ↑
          case 4:
            line.y0 = 0;
            line.y1 = height;
            break;
          // ↗
          case 5:
            line.x0 = width;
            line.y1 = height;
            break;
        }
      } while (!lineIsInteresting(line));

      return line;
    });
    setInitialPositions(positions);
  }, [height, width]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    let frameCount = 0;
    let lastRenderTime = 0;
    let animationFrameId: number;

    const redraw: FrameRequestCallback = (currentTime) => {
      animationFrameId = window.requestAnimationFrame(redraw);
      if (currentTime - lastRenderTime < interval) {
        return;
      }
      lastRenderTime = currentTime;
      frameCount++;
      draw(context, frameCount);
    };
    window.requestAnimationFrame(redraw);

    // cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });
  // no deps here guarantees we run this on every update
  // otherwise an outdated version of `draw()` is used

  if (canvasRef.current) {
  }

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Background;
