import { fireEvent, queryHelpers, within } from "@testing-library/react";

const expectButtons = ({ list, nextButton, previousButton }) => {
  let _start = 0;
  let _end = 0;
  let _previousButtonEnabled = false;
  let _nextButtonEnabled = false;
  let _users = [];

  const execute = () => {
    const previous = expect(previousButton);
    const next = expect(nextButton);

    if (_previousButtonEnabled) previous.not;
    if (_nextButtonEnabled) next.not;

    previous.toHaveClass("disabled");
    next.toHaveClass("disabled");

    let usersFiltered = _users;
    if (!(_start === 0 && _end === 0)) {
      usersFiltered = usersFiltered.slice(_start, _end);
    }
    usersFiltered.forEach(assertUser(list));
  };

  const goTo = {
    goToNextPage: function () {
      execute();
      fireEvent.click(nextButton);
    },
    goToPreviousPage: function () {
      execute();
      fireEvent.click(previousButton);
    },
  };

  const then = () => {
    return goTo;
  };

  const toEndWith = function (end) {
    _end = end;
    return { then, execute };
  };

  const options = {
    toStartWith: function (start) {
      _start = start;
      return {
        toEndWith: toEndWith,
      };
    },
    toEndWith,
    toBe: function ({ previousButtonEnabled, nextButtonEnabled, users }) {
      _users = users;
      _previousButtonEnabled = previousButtonEnabled;
      _nextButtonEnabled = nextButtonEnabled;
      return {
        toStartWith: this.toStartWith,
        then,
        execute,
      };
    },
  };

  return options;
};

export const assertUser = (list) => (user) => {
  const container = queryHelpers.queryByAttribute("data-id", list, user.id);

  if (!container)
    throw new Error(`Container with data-id ${user.id} not found`);
  const row = within(container);

  row.getByText(user.name);
  row.getByText(user.lastname);
  row.getByText(user.username);
  row.getByText(user.id);
};

export default expectButtons;
