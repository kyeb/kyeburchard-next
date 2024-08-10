import { useEffect, useRef, useState } from "react";
import styles from "../styles/Background.module.css";
import {
  initializeLines,
  updateLines,
  drawLines,
  updateDims,
} from "../lib/animation";

const fps = 60;
const interval = (1 / fps) * 1000; // ms

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep canvas sizing in sync with window dimensions
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [running, setRunning] = useState(true);

  const updateWindowSize = () => {
    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // const rect = canvas.getBoundingClientRect();
    // if (!rect) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    console.log(dpr);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    setWidth(window.innerWidth * dpr);
    setHeight(window.innerHeight * dpr);
    updateDims(window.innerWidth * dpr, window.innerHeight * dpr);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    switch (e.code) {
      case "Space":
        setRunning(!running);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => document.removeEventListener("keydown", handleKeypress);
  }, [running]);

  useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    initializeLines();
  }, [width, height]);

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

      updateLines();
      drawLines(context);
    };
    if (running) animationFrameId = window.requestAnimationFrame(redraw);

    // cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });
  // TODO: can we have deps?
  // no deps here guarantees we run this on every update
  // otherwise an outdated version of `drawLines()` is used

  return (
    <div className={styles.background}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
      />
    </div>
  );
};

export default Background;
