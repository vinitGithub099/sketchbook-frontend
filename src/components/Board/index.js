import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>;
}
