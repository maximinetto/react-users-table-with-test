import {
  act,
  fireEvent,
  queryHelpers,
  render,
  screen,
  within,
} from "@testing-library/react";
import expectButtons from "../utils/expectButtons";
import UserManagement from "../Components/UserManagement";
import { users } from "../../users-1668887829587.json";
import { vi } from "vitest";
import { deleteUser, getUsers } from "services/user.service";
import { Store } from "react-notifications-component";

describe("User Management", () => {
  let list;
  let nextButton;
  let previousButton;

  async function setupAll() {
    await act(() => {
      render(<UserManagement />);
      vi.mocked(getUsers).mockResolvedValue(users);
    });
    setupElements();
  }

  function setupElements() {
    list = screen.getByTestId("tbody");
    const nav = screen.getByLabelText("pagination-nav");
    nextButton = nav.querySelector("a[rel='Next']");
    previousButton = nav.querySelector("a[rel='Previous']");
  }

  vi.mock("react-notifications-component", async () => {
    const module = await vi.importActual("react-notifications-component");
    return {
      ...module,
      Store: {
        addNotification: vi.fn(),
      },
    };
  });

  vi.mock("../config/constants", async () => {
    const module = await vi.importActual("../config/constants");
    return {
      ...module,
      LIMIT: 2,
    };
  });

  vi.mock("../services/user.service", () => ({
    getUsers: vi.fn(),
    deleteUser: vi.fn(),
  }));

  it("should paginate a list of users", async () => {
    await setupAll();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: false,
      })
      .toStartWith(0)
      .toEndWith(2)
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .toStartWith(2)
      .toEndWith(4)
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .toStartWith(4)
      .toEndWith(6)
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: false,
        previousButtonEnabled: true,
      })
      .toStartWith(6)
      .toEndWith(8)
      .then()
      .goToPreviousPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .toStartWith(4)
      .toEndWith(6)
      .then()
      .goToPreviousPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .toStartWith(2)
      .toEndWith(4)
      .then()
      .goToPreviousPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users,
        nextButtonEnabled: true,
        previousButtonEnabled: false,
      })
      .toStartWith(0)
      .toEndWith(2)
      .execute();
  });

  it("should filter the users correctly", async () => {
    await setupAll();

    const input = screen.getByLabelText("search-input");

    fireEvent.change(input, { target: { value: "M" } });

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 7,
            name: "Patricia",
            lastname: "Mendez",
            username: "patome@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
          {
            id: 4,
            name: "Estefani",
            lastname: "Mendoza",
            username: "stefigrosa@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: true,
        previousButtonEnabled: false,
      })
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 1,
            name: "Maximiliano",
            lastname: "Minetto",
            username: "maximinetto",
            isAdmin: true,
            isActive: true,
            superAdmin: true,
          },
          {
            id: 2,
            name: "Nacho",
            lastname: "Monreal",
            username: "nachokpo@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: false,
        previousButtonEnabled: true,
      })
      .then()
      .goToPreviousPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 7,
            name: "Patricia",
            lastname: "Mendez",
            username: "patome@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
          {
            id: 4,
            name: "Estefani",
            lastname: "Mendoza",
            username: "stefigrosa@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: true,
        previousButtonEnabled: false,
      })
      .execute();

    fireEvent.change(input, { target: { value: "Me" } });

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 7,
            name: "Patricia",
            lastname: "Mendez",
            username: "patome@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
          {
            id: 4,
            name: "Estefani",
            lastname: "Mendoza",
            username: "stefigrosa@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: false,
        previousButtonEnabled: false,
      })
      .execute();
  });

  it("should delete a user", async () => {
    await act(() => {
      render(<UserManagement />);
      vi.mocked(getUsers)
        .mockResolvedValueOnce(users)
        .mockResolvedValueOnce(users.filter((u) => u.id !== 2));

        vi.mocked(deleteUser).mockResolvedValue({
        status: 200,
      });
    });

    setupElements();

    const input = screen.getByLabelText("search-input");

    fireEvent.change(input, { target: { value: "M" } });
    fireEvent.click(nextButton);

    const row = queryHelpers.queryByAttribute("data-id", list, 2);

    const container = within(row);

    await act(async () => {
      const deleteButton = await container.findByLabelText("delete");
      fireEvent.click(deleteButton);
    });

    await expect(deleteUser).toBeCalledTimes(1);
    expect(nextButton).toBeEnabled();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 6,
            name: "Romina",
            lastname: "Benitez",
            username: "romy999@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
          {
            id: 8,
            name: "Alexis",
            lastname: "Bunanote",
            username: "alx777@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: true,
        previousButtonEnabled: false,
      })
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 5,
            name: "Rodrigo",
            lastname: "Goes",
            username: "halamadridgo@gmail.com",
            isAdmin: false,
            isActive: false,
            superAdmin: false,
          },

          {
            id: 7,
            name: "Patricia",
            lastname: "Mendez",
            username: "patome@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 4,
            name: "Estefani",
            lastname: "Mendoza",
            username: "stefigrosa@gmail.com",
            isAdmin: true,
            isActive: true,
            superAdmin: false,
          },
          {
            id: 1,
            name: "Maximiliano",
            lastname: "Minetto",
            username: "maximinetto",
            isAdmin: true,
            isActive: true,
            superAdmin: true,
          },
        ],
        nextButtonEnabled: true,
        previousButtonEnabled: true,
      })
      .then()
      .goToNextPage();

    expectButtons({
      list,
      nextButton,
      previousButton,
    })
      .toBe({
        users: [
          {
            id: 3,
            name: "Esteban",
            lastname: "Rodriguez",
            username: "estebanquiro@gmail.com",
            isAdmin: false,
            isActive: true,
            superAdmin: false,
          },
        ],
        nextButtonEnabled: false,
        previousButtonEnabled: true,
      })
      .execute();

    expect(Store.addNotification).toBeCalledTimes(1);
  });
});
