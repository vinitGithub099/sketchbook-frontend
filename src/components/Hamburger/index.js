import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styles from "./index.module.css";

export default function Hamburger({ openMenu, handleToggleMenu }) {
  return (
    <div
      className={styles.iconsWrapper}
      onClick={() => handleToggleMenu((prev) => !prev)}
    >
      {!openMenu ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
    </div>
  );
}
