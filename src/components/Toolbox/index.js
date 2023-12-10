import { COLORS } from "@/constants";
import styles from "./index.module.css";

export default function Toolbox() {
  const updateBrushSize = () => {};
  return (
    <div className={styles.toolBoxContainer}>
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color:</h4>
        <div className={styles.itemContainer}>
          {Object.keys(COLORS).map((color) => (
            <div
              className={styles.colorBox}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size:</h4>
        <div className={styles.itemContainer}>
          <input type="range" min={1} max={10} onChange={updateBrushSize} />
        </div>
      </div>
    </div>
  );
}
