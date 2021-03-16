import { useEffect, useRef, useState } from "react";
import styles from "../styles/Background.module.css";
import {
  initializeLines,
  updateLines,
  drawLines,
  updateDims,
} from "./animation";

const fps = 60;
const interval = (1 / fps) * 1000; // ms

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep canvas sizing in sync with window dimensions
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWindowSize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    updateDims(window.innerWidth, window.innerHeight);
  };

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

      updateLines(width, height);
      drawLines(context);
    };
    animationFrameId = window.requestAnimationFrame(redraw);

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
