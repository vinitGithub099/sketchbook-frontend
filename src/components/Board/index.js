import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/store/Features/menuSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Board() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(false);
  const drawHistoryRef = useRef([]);
  const historyPointerRef = useRef(null);

  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointerRef.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointerRef.current -= 1;
      if (
        historyPointerRef.current < drawHistoryRef.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointerRef.current += 1;
      const imageData = drawHistoryRef.current[historyPointerRef.current];
      context.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    console.log(color, size);
    changeConfig(color, size);
  }, [color, size]);

  /* mount */
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDrawRef.current = true;
      beginPath(e.clientX, e.clientY);
    };

    const handleMouseUp = (e) => {
      shouldDrawRef.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistoryRef.current.push(imageData);
      historyPointerRef.current = drawHistoryRef.current.length - 1;
    };

    const handleMouseMove = (e) => {
      if (!shouldDrawRef.current) return;
      drawLine(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>;
}
