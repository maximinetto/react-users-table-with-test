import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { bool, func } from "prop-types";
import Link from "../Link";
import styles from "./index.module.css";

function Pagination({
  page,
  hasMore,
  hasPrevious,
  onNextClick,
  onPreviousClick,
}) {
  const onClickAnterior = (event) => {
    onPreviousClick(event);
  };

  const onClickSiguiente = (event) => {
    onNextClick(event);
  };

  const previousButtonDisabled = !hasPrevious;
  const nextButtonDisabled = !hasMore;

  return (
    <nav
      aria-label="pagination-nav"
      className={classNames(styles.navCenter, "mt-5")}
    >
      <ul className="pagination">
        <li className="page-item">
          <Link
            className={classNames("btn btn--dark page-link btn--circle", {
              disabled: previousButtonDisabled,
            })}
            onClick={onClickAnterior}
            disabled={previousButtonDisabled}
            rel="Previous"
            href={`?page=${page - 1}`}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              width={16}
              height={16}
            />
          </Link>
        </li>
        <li
          className="page-item"
        >
          <Link
            className={classNames("btn btn--dark page-link btn--circle", {
              disabled: nextButtonDisabled,
            })}
            onClick={onClickSiguiente}
            disabled={nextButtonDisabled}
            rel="Next"
            href={`?page=${page + 1}`}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              width={16}
              height={16}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  hasMore: bool,
  hasPrevious: bool,
  onNextClick: func,
  onPreviousClick: func,
};

export default Pagination;
