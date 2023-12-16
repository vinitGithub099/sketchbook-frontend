import {
  BsFiletypeJpg,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeSvg,
} from "react-icons/bs";

import { FILE_TYPES, MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/store/Features/menuSlice";
import { changeFileType } from "@/store/Features/toolboxSlice";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";

export default function Download() {
  const dispatch = useDispatch();

  const handleDownload = (fileType) => {
    dispatch(changeFileType(fileType));
    dispatch(actionItemClick(MENU_ITEMS.DOWNLOAD));
  };

  return (
    <div className={styles.downloadWrapper}>
      <div className={styles.downloadOptions}>
        <div
          className={styles.downloadoption}
          onClick={() => handleDownload(FILE_TYPES.PNG)}
        >
          <BsFiletypePng size={20} />
          <span className={styles.optionText}>
            {FILE_TYPES.PNG?.toUpperCase()}
          </span>
        </div>
        <div
          className={styles.downloadoption}
          onClick={() => handleDownload(FILE_TYPES.JPG)}
        >
          <BsFiletypeJpg size={20} />
          <span className={styles.optionText}>
            {FILE_TYPES.JPG?.toUpperCase()}
          </span>
        </div>
        <div
          className={styles.downloadoption}
          onClick={() => handleDownload(FILE_TYPES.SVG)}
        >
          <BsFiletypeSvg size={20} />
          <span className={styles.optionText}>
            {FILE_TYPES.SVG?.toUpperCase()}
          </span>
        </div>
        <div
          className={styles.downloadoption}
          onClick={() => handleDownload(FILE_TYPES.PDF)}
        >
          <BsFiletypePdf size={20} />
          <span className={styles.optionText}>
            {FILE_TYPES.PDF?.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
