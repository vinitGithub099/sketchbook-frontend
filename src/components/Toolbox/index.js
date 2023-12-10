import { COLORS, MENU_ITEMS } from "@/constants";
import { changeBrushSize, changeColor } from "@/store/Features/toolboxSlice";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Toolbox() {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  const showStrokeToolOption = activeMenuItem == MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem == MENU_ITEMS.PENCIL || activeMenuItem == MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  return (
    <div className={styles.toolBoxContainer}>
      {showStrokeToolOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color:</h4>
          <div className={styles.itemContainer}>
            {Object.keys(COLORS).map((bgColor, index) => (
              <div
                key={index}
                className={cx(styles.colorBox, {
                  [styles.active]: COLORS[bgColor] === color,
                })}
                style={{ backgroundColor: COLORS[bgColor] }}
                id={bgColor}
                onClick={() => updateColor(COLORS[bgColor])}
              ></div>
            ))}
          </div>
        </div>
      ) : null}
      {showBrushToolOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size: {activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={size}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
