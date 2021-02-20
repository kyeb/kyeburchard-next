import { useEffect, useRef, useState } from "react";
import styles from "../styles/Background.module.css";

let fps = 60;
let interval = (1 / fps) * 1000; // ms

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.strokeStyle = "#ffffff";
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(100, 100);
    // ctx.stroke();
  };

  // keep canvas sizing in sync with window dimensions
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const updateWindowSize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
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
  }, []);

  if (canvasRef.current) {
  }

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Background;
