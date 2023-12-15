import { MENU_ITEMS } from "@/constants";
import { changeBrushSize, changeColor } from "@/store/Features/toolboxSlice";
import { FaPaintBrush } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Toolbox() {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  const showStrokeToolOption =
    activeMenuItem == MENU_ITEMS.PENCIL ||
    activeMenuItem == MENU_ITEMS.LINE ||
    activeMenuItem == MENU_ITEMS.CIRCLE ||
    activeMenuItem == MENU_ITEMS.SQUARE;
  const showBrushToolOption =
    activeMenuItem == MENU_ITEMS.PENCIL ||
    activeMenuItem == MENU_ITEMS.LINE ||
    activeMenuItem == MENU_ITEMS.SQUARE ||
    activeMenuItem == MENU_ITEMS.CIRCLE ||
    activeMenuItem == MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  return (
    <div className={styles.toolBoxContainer}>
      {showStrokeToolOption ? (
        <div className={styles.colorInputWrapper}>
          <input
            className={styles.colorBox}
            type="color"
            onClick={(e) => updateColor(e.target.value)}
          />
        </div>
      ) : null}
      {showBrushToolOption ? (
        <div className={styles.brushContainer}>
          <div className={styles.iconsWrapper}>
            <FaPaintBrush />
          </div>
          <div className={styles.rangeInputWrapper}>
            <input
              type="range"
              className={styles.rangeInput}
              min={1}
              max={100}
              step={0.1}
              value={size}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
