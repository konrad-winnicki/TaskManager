import { describe, expect, test, jest } from "@jest/globals";


import { UserManager } from "../classes/UserManager";
import {
  testing_data_indexedTasks,
  testing_data_dataFromDB,
} from "./TaskManager.test";
import { TaskManager } from "../classes/TaskManager";
import { ObjectId } from "mongodb";
import { mocked } from "jest-mock";
import { DatabaseConnector } from "../classes/DatabaseConnector";
jest.mock("../classes/DatabaseConnector");

describe("Test class UserManager", () => {
  const testing_data_arrayOfTask = [
    { userIndex: 1, id: "3", name: "task3", deadline: null, status: "pending" },
    {
      userIndex: 2,
      id: "1",
      name: "task1",
      deadline: null,
      status: "accomplished",
    },
    {
      userIndex: 3,
      id: "2",
      name: "task2",
      deadline: null,
      status: "accomplished",
    },
  ];

  const connector = new DatabaseConnector("uri");
  const mockedConnectorInstance = mocked(connector);
  const userManager = new UserManager(new TaskManager(mockedConnectorInstance));

  test("showTabele() method lists tasks and if array is empty show message: 'There are no tasks to show!'", () => {
    const spyTable = jest.spyOn(console, "table");
    const spyLog = jest.spyOn(console, "log");
    userManager.showTable(testing_data_arrayOfTask);
    expect(spyTable).toHaveBeenCalledWith(testing_data_arrayOfTask);
    userManager.showTable([]);
    expect(spyLog).toHaveBeenCalledWith("There are no tasks to show!");
  });

  test("deleteTask() method search task id and if not found print: 'Task with this number does not exist!'", () => {
    const spyLog = jest.spyOn(console, "log");
    const taskToDelete = "100";
    userManager.deleteTask(taskToDelete, testing_data_indexedTasks);
    expect(spyLog).toHaveBeenCalledWith(
      "Task with this number does not exist!"
    );
  });

  test("deleteTask() method search task Id and call deleteTask method from TaskManager class passing id as parameter", () => {
    const taskToDelete = "1";
    const taskId = testing_data_dataFromDB[5]._id.toString();
    userManager.deleteTask(taskToDelete, testing_data_indexedTasks);

    expect(mockedConnectorInstance.deleteDataFromDB).toHaveBeenCalled();
    expect(mockedConnectorInstance.deleteDataFromDB).toHaveBeenCalledWith(
      taskId
    );
  });

  test("updateTask() method search task id and if not found print: 'Task with this number does not exist!'", () => {
    const spyLog = jest.spyOn(console, "log");
    const taskToDelete = "100";
    userManager.updateTask(taskToDelete, testing_data_indexedTasks);
    expect(spyLog).toHaveBeenCalledWith(
      "Task with this number does not exist!"
    );
  });

  test("updateTask() method search task id and call updateTask method from TaskManager class with data to be modified as parameter", () => {
    const taskToDelete = "1";
    const filter = {
      _id: new ObjectId(testing_data_dataFromDB[5]._id.toString()),
    };
    const update = { $set: { status: "accomplished" } };
    userManager.updateTask(taskToDelete, testing_data_indexedTasks);
    expect(mockedConnectorInstance.updateDB).toHaveBeenCalled();
    expect(mockedConnectorInstance.updateDB).toHaveBeenCalledWith(
      filter,
      update
    );
  });
});
