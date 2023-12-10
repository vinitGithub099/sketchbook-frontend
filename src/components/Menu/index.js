import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";

export default function Menu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.iconsWrapper}>
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div className={styles.iconsWrapper}>
        <FontAwesomeIcon icon={faEraser} />
      </div>
      <div className={styles.iconsWrapper}>
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div className={styles.iconsWrapper}>
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
      <div className={styles.iconsWrapper}>
        <FontAwesomeIcon icon={faFileArrowDown} />
      </div>
    </div>
  );
}
