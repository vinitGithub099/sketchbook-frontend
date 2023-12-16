import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/store/Features/menuSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Board() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(false);
  const drawHistoryRef = useRef([]);
  const historyPointerRef = useRef(null);
  let prevX = 0,
    prevY = 0;

  const { activeMenuItem, actionMenuItem, filled } = useSelector(
    (state) => state.menu
  );
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const { type } = useSelector((state) => state.toolbox[MENU_ITEMS.DOWNLOAD]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const drawRectangle = (x, y) => {
      if (filled) {
        context.fillStyle = color;
        context.fillRect(x, y, prevX - x, prevY - y);
      } else {
        context.strokeRect(x, y, prevX - x, prevY - y);
      }
    };

    const drawCircle = (x, y) => {
      context.beginPath();

      const radius = Math.abs(prevX - x) + Math.abs(prevY - y);
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.stroke();
      if (filled) {
        context.fillStyle = color;
        context.fill();
      }
    };

    const handleMouseDown = (e) => {
      shouldDrawRef.current = true;
      prevX = e.clientX;
      prevY = e.clientY;
      beginPath(e.clientX, e.clientY);
      if (canvasRef.current) canvasRef.current.style.cursor = "crosshair";
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistoryRef.current.push(imageData);
      historyPointerRef.current = drawHistoryRef.current.length - 1;
    };

    const handleMouseUp = (e) => {
      if (activeMenuItem === MENU_ITEMS.LINE) drawLine(e.clientX, e.clientY);
      shouldDrawRef.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistoryRef.current.push(imageData);
      historyPointerRef.current = drawHistoryRef.current.length - 1;
      if (canvasRef.current) canvasRef.current.style.cursor = "auto";
    };

    const handleMouseMove = (e) => {
      if (!shouldDrawRef.current) return;

      const imageData = drawHistoryRef.current[historyPointerRef.current];
      if (imageData) context.putImageData(imageData, 0, 0);

      if (activeMenuItem === MENU_ITEMS.PENCIL) drawLine(e.clientX, e.clientY);

      if (activeMenuItem === MENU_ITEMS.ERASER) drawLine(e.clientX, e.clientY);

      if (activeMenuItem === MENU_ITEMS.SQUARE) {
        drawRectangle(e.clientX, e.clientY);
      }

      if (activeMenuItem === MENU_ITEMS.CIRCLE) {
        drawCircle(e.clientX, e.clientY);
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeMenuItem, filled, color]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = `sketch.${type}`;
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointerRef.current > -1 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointerRef.current -= 1;
      if (
        historyPointerRef.current < drawHistoryRef.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointerRef.current += 1;

      if (
        historyPointerRef.current == -1 &&
        actionMenuItem === MENU_ITEMS.UNDO
      ) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        const imageData = drawHistoryRef.current[historyPointerRef.current];
        if (imageData) context.putImageData(imageData, 0, 0);
      }
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, type]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeConfig(color, size);
  }, [color, size]);

  /* mount */
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "	#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
