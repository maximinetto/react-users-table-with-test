import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./index.module.css";

export default function SearchField({ value, onChange, onClick }) {
  return (
    <div className="textLeft">
      <div
        className={classNames(
          "inlineFlex flexHorizontal relative",
          styles.flexCenterVertical
        )}
      >
        <input
          type="text"
          className={classNames(styles.padding, styles.input)}
          placeholder="Buscar..."
          aria-label="search-input"
          value={value}
          onChange={onChange}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.icon}
          fontSize="12"
          color="#CFCFCF"
        />
        <button
          type="button"
          className={classNames("btn btn--transparent", styles.button)}
          id="button-addon"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={faX}
            className={styles.iconClear}
            fontSize="12"
            color="#CFCFCF"
          />
        </button>
      </div>
    </div>
  );
}
