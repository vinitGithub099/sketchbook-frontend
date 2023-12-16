import { MENU_ITEMS } from "@/constants";
import {
  actionItemClick,
  menuItemClick,
  toggleFill,
} from "@/store/Features/menuSlice";
import cx from "classnames";
import { FaFileDownload, FaRedoAlt, FaSlash, FaUndoAlt } from "react-icons/fa";
import {
  FaEraser,
  FaFill,
  FaPencil,
  FaRegCircle,
  FaRegSquareFull,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Download from "./Download";
import styles from "./index.module.css";

export default function Menu() {
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem, filled } = useSelector(
    (state) => state.menu
  );

  const handleMenuItemClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  // const handleDownload = (fileType) => {
  //   dispatch(changeFileType(fileType));
  //   handleActionItemClick(MENU_ITEMS.DOWNLOAD);
  // };

  const handleFillStatus = () => {
    dispatch(toggleFill());
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
      >
        <FaPencil />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.LINE,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.LINE)}
      >
        <FaSlash />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
      >
        <FaEraser />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.SQUARE,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.SQUARE)}
      >
        <FaRegSquareFull />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.CIRCLE,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.CIRCLE)}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: actionMenuItem === MENU_ITEMS.UNDO,
        })}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <FaUndoAlt />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: actionMenuItem === MENU_ITEMS.REDO,
        })}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <FaRedoAlt />
      </div>
      <div
        className={cx(styles.iconsWrapper, {
          [styles.active]: actionMenuItem === MENU_ITEMS.DOWNLOAD,
        })}
      >
        <FaFileDownload />
        <Download />
      </div>
      <div
        className={cx(styles.iconsWrapper, { [styles.active]: filled })}
        onClick={() => handleFillStatus()}
      >
        <FaFill />
      </div>
    </div>
  );
}
