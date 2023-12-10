import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Board() {
  const canvasRef = useRef(null);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>;
}
