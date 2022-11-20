import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export default function UserActions({ user, onDeleteUser }) {
  return (
    <td>
      <div className="flex flexHorizontal flexCenter">
        <button
          type="button"
          className={classNames("ml-2 btn btn--danger")}
          onClick={(event) => onDeleteUser(user)}
          data-toggle="tooltip"
          data-placement="top"
          title="Eliminar usuario"
          aria-label="delete"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </td>
  );
}
