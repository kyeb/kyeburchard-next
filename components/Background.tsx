import { useEffect, useRef, useState } from "react";
import styles from "../styles/Background.module.css";
import { initializeLines, updateLines, drawLines } from "./animation";

const fps = 60;
const interval = (1 / fps) * 1000; // ms

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep canvas sizing in sync with window dimensions
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const updateWindowSize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    initializeLines(width, height);
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

      updateLines(frameCount, width, height);
      drawLines(context, frameCount);
    };
    animationFrameId = window.requestAnimationFrame(redraw);

    // cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });
  // no deps here guarantees we run this on every update
  // otherwise an outdated version of `drawLines()` is used

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Background;
