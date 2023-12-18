import Board from "@/components/Board/index";
import Hamburger from "@/components/Hamburger";
import Menu from "@/components/Menu/index";
import Toolbox from "@/components/Toolbox/index";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(true);
  const handleToggleMenu = () => setOpenMenu((prev) => !prev);
  return (
    <div className={styles.appContainer}>
      <Hamburger {...{ openMenu, handleToggleMenu }} />
      {openMenu ? (
        <div className={styles.actionContainer}>
          <Menu />
          <Toolbox />
        </div>
      ) : null}
      <Board></Board>
    </div>
  );
}
