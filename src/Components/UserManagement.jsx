import Pagination from "./Pagination";
import UserTable from "./UserTable/UserTable";
import { errorDelete, exito } from "../config/constants";
import useFilters from "../hooks/useFilters";
import SearchField from "./SearchField";
import { Store } from "react-notifications-component";
import { deleteUser } from "../services/user.service";

function UserManagement() {
  const {
    page,
    data,
    valueInput,
    hasMore,
    hasPrevious,
    refetch,
    goToNextPage,
    goToPreviousPage,
    handleChangeInput,
    handleClickButtonClose,
  } = useFilters();

  const handleDeleteUser = async (user) => {
    try {
      await deleteUser(user.id);

      Store.addNotification(exito);
      
      refetch();
    } catch (err) {
      console.warn("err:", { err });
      Store.addNotification(errorDelete);
    }
  };

  return (
    <section className="container">
      <h2 className="mt-5">Usuarios</h2>
      <main>
        <SearchField
          value={valueInput}
          onChange={handleChangeInput}
          onClick={handleClickButtonClose}
        />

        <UserTable className="mt-5" users={data} onDeleteUser={handleDeleteUser} />

        <Pagination
          page={page}
          hasPrevious={hasPrevious}
          hasMore={hasMore}
          onNextClick={goToNextPage}
          onPreviousClick={goToPreviousPage}
        />
      </main>
    </section>
  );
}

export default UserManagement;
