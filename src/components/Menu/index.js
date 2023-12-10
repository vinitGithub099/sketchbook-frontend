import { MENU_ITEMS } from "@/constants";
import { menuItemClick } from "@/store/Features/menuSlice";
import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Menu() {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const handleMenuItemClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div
        className={styles.iconsWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} />
      </div>
      <div
        className={styles.iconsWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div
        className={styles.iconsWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
      <div
        className={styles.iconsWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faFileArrowDown} />
      </div>
    </div>
  );
}
