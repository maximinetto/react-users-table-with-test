import { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { error, LIMIT } from "../config/constants";
import { getUsers } from "../services/user.service";

const userFilter = (search) => (u) => {
  if (search === "") return true;

  const upperCase = search.toUpperCase();

  const name = u.name.toUpperCase();
  const lastname = u.lastname.toUpperCase();
  return name.startsWith(upperCase) || lastname.startsWith(upperCase);
};

const getData = (setState) => async (options) => {
  try {
    const _options =
      options && options.signal ? { signal: options.signal } : {};

    const users = await getUsers(_options);
    console.log("getData ---- users:", users);

    setState((prevState) => ({
      valueInput: "",
      limit: prevState.limit,
      users,
      page: 0,
    }));
  } catch (err) {
    console.warn(err);
    if (err.code === "ERR_CANCELED") return;
    Store.addNotification(error);
    return setState((prevState) => ({
      valueInput: "",
      limit: prevState.limit,
      users: [],
      page: 0,
    }));
  }
};

export default function useFilters() {
  const [state, setState] = useState({
    valueInput: "",
    limit: LIMIT,
    users: [],
    page: 0,
  });

  const start = state.page * state.limit;
  const end = start + state.limit;

  const filteredUsers = state.users.filter(userFilter(state.valueInput));
  const data = filteredUsers.slice(start, end);

  useEffect(() => {
    getData(setState)();
    return () => {
      console.log("clear");
    };
  }, []);

  useEffect(() => {
    const currentPage = state.page + 1;
    history.pushState(
      { page: currentPage },
      `title ${currentPage}`,
      `?page=${currentPage}`
    );
  }, [state.page]);

  const goToNextPage = () => {
    setState((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const goToPreviousPage = () => {
    setState((prevState) => ({
      ...state,
      page: prevState.page > 0 ? prevState.page - 1 : 0,
    }));
  };

  const handleChangeInput = (event) => {
    const valor = event.target.value;
    setState({ ...state, valueInput: valor });
  };

  const handleClickButtonClose = () => {
    setState({
      ...state,
      valueInput: "",
    });
  };

  const hasMoreElements = (lastUser) => {
    const index = filteredUsers.findIndex((u) => u.id === lastUser.id);
    const nextIndex = index + 1;
    return filteredUsers.length > nextIndex;
  };

  const hasPreviousElements = (firstUser) => {
    const index = filteredUsers.findIndex((u) => u.id === firstUser.id);
    const previousIndex = index - 1;
    return previousIndex > 0;
  };

  const hasMore = data.length > 0 ? hasMoreElements(data.slice(-1)[0]) : false;
  const hasPrevious =
    data.length > 0 ? hasPreviousElements(data.slice(0)[0]) : false;

  console.log("useFilters ---- state: ", state);
  console.log("useFilters ---- data: ", data);

  return {
    ...state,
    data,
    hasMore,
    hasPrevious,
    refetch: getData(setState),
    goToNextPage,
    goToPreviousPage,
    handleChangeInput,
    handleClickButtonClose,
  };
}
