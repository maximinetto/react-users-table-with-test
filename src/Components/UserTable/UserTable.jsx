import classNames from "classnames";
import UserActions from "../UserActions";
import styles from "./UserTable.module.css";

export default function UserTable({ className, users, onDeleteUser }) {
  return (
    <table className={classNames(styles.table, className)}>
      <tbody data-testid="tbody">
        {users.map((u) => (
          <tr
            key={u.id}
            data-id={u.id}
            className={classNames("flex flexHorizontal", styles.row)}
          >
            <td aria-label="userId" className={styles.id}>
              {u.id}
            </td>
            <td aria-label="username" className={styles.username}>
              {u.username}
            </td>
            <td aria-label="name" className={styles.name}>
              {u.name}
            </td>
            <td aria-label="lastname" className={styles.lastname}>
              {u.lastname}
            </td>
            <UserActions user={u} onDeleteUser={onDeleteUser} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
