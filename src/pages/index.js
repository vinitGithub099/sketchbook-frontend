import Board from "@/components/Board/index";
import Menu from "@/components/Menu/index";
import Toolbox from "@/components/Toolbox/index";
import styles from "./index.module.css";
export default function Home() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.actionContainer}>
        <Menu></Menu>
        <Toolbox></Toolbox>
      </div>
      <Board></Board>
    </div>
  );
}
