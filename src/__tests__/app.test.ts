import { describe, expect, test, jest} from "@jest/globals";

import { run } from "../app";
import { UnknownFunction, mocked} from "jest-mock";
import prompt from "prompt";

jest.mock("prompt");
import { TaskManager } from "../classes/TaskManager";
import { NumberedTaskList } from "../classes/NumberedTaskList";
import { UserManager } from "../classes/UserManager";
jest.mock("../classes/UserManager");
import { DatabaseConnector } from "../classes/DatabaseConnector";
jest.mock("../classes/DatabaseConnector");



describe("Test app.ts", () => {
  const numberedTaskList = new NumberedTaskList([]);
  const mockedNumberedTaskList = mocked(numberedTaskList);
  const userManager = new UserManager(
    new TaskManager(new DatabaseConnector("uri"))
  );
  const mockedUserManager = mocked(userManager);
 

  function promptUserResponse(userResponse: string) {
    (prompt.get as jest.Mock).mockImplementation(
      (_schema: unknown, callback:unknown) => {
        (callback as UnknownFunction)(null, { command: userResponse });
      }
    );
  }
  function recurenceEnd() {
    (prompt.get as jest.Mock).mockImplementation(
      (_schema: unknown, callback:unknown ) => {
        (callback as UnknownFunction) (null, { command: 'q' });
      }
    );
  }

  test("App should call createTask method from UserManager calss if user put 'a': ", async () => {
    promptUserResponse("a");

    
   
    await run(mockedUserManager, mockedNumberedTaskList);
    expect(mockedUserManager.createTask).toHaveBeenCalledTimes(1);
    recurenceEnd();
  });

  test("App should call showTable() if user put 's': ", async () => {
    promptUserResponse('s');
    mockedUserManager.readTask.mockImplementation(() => {
      return Promise.resolve(new NumberedTaskList([]));
    });
    await run(mockedUserManager, mockedNumberedTaskList);
    expect(mockedUserManager.showTable).toHaveBeenCalled();
    recurenceEnd();
  });

  test("App should call deleteTask method from UserManager calss if user put 'del': ", async () => {
    promptUserResponse("del");
    await run(mockedUserManager, numberedTaskList);
    expect(mockedUserManager.deleteTask).toBeCalled();
    recurenceEnd();
  });

  test("App should call updateTask() method from UserManager calss if user put 'm': ", async () => {
    promptUserResponse("m");
    await run(mockedUserManager, numberedTaskList);
    expect(mockedUserManager.updateTask).toHaveBeenCalled();
    recurenceEnd();
  });

  test("App should return 'Program finished if user put 'q': ", async () => {
    promptUserResponse("q");
    const spy = jest.spyOn(console, "log");
    await run(mockedUserManager, numberedTaskList);
    expect(spy).toBeCalledWith("Program finished");
  });
});


