import { COLORS, MENU_ITEMS } from "@/constants";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Toolbox() {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const showStrokeToolOption = activeMenuItem == MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem == MENU_ITEMS.PENCIL || activeMenuItem == MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {};

  return (
    <div className={styles.toolBoxContainer}>
      {showStrokeToolOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color:</h4>
          <div className={styles.itemContainer}>
            {Object.keys(COLORS).map((color, index) => (
              <div
                key={index}
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      ) : null}
      {showBrushToolOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size: {activeMenuItem}</h4>
          <div className={styles.itemContainer}>
            <input type="range" min={1} max={10} onChange={updateBrushSize} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
