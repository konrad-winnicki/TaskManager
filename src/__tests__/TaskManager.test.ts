import { describe, expect, test, jest } from "@jest/globals";
import { NumberedTaskList, IndexedTasks } from "../classes/NumberedTaskList";
import { Task } from "../classes/Task";
import { mocked } from "jest-mock";
import { TaskManager, UserInputData } from "../classes/TaskManager";
import { ObjectId, WithId } from "mongodb";
import {
  DatabaseConnector,
  Document,
  InsertData,
} from "../classes/DatabaseConnector";

jest.mock("../classes/DatabaseConnector");

export const testing_data_dataFromDB: Array<WithId<Document>> = [
  { _id: new ObjectId(), name: "task1", date: null, status: "accomplished" },
  { _id: new ObjectId(), name: "task2", date: null, status: "accomplished" },
  { _id: new ObjectId(), name: "task3", date: null, status: "pending" },
  { _id: new ObjectId(), name: "task4", date: null, status: "pending" },
  {
    _id: new ObjectId(),
    name: "task5",
    date: new Date("2020-01-01"),
    status: "pending",
  },
  {
    _id: new ObjectId(),
    name: "task6",
    date: new Date("2000-01-01"),
    status: "pending",
  },
];

export const testing_data_indexedTasks: Array<IndexedTasks> = [
  {
    userIndex: 1,
    id: testing_data_dataFromDB[5]._id.toString(),
    name: "task6",
    deadline: new Date("2000-01-01"),
    status: "pending",
  },

  {
    userIndex: 2,
    id: testing_data_dataFromDB[4]._id.toString(),
    name: "task5",
    deadline: new Date("2020-01-01"),
    status: "pending",
  },
  {
    userIndex: 3,
    id: testing_data_dataFromDB[2]._id.toString(),
    name: "task3",
    deadline: null,
    status: "pending",
  },
  {
    userIndex: 4,
    id: testing_data_dataFromDB[3]._id.toString(),
    name: "task4",
    deadline: null,
    status: "pending",
  },
  {
    userIndex: 5,
    id: testing_data_dataFromDB[0]._id.toString(),
    name: "task1",
    deadline: null,
    status: "accomplished",
  },
  {
    userIndex: 6,
    id: testing_data_dataFromDB[1]._id.toString(),
    name: "task2",
    deadline: null,
    status: "accomplished",
  },
];

export const testing_data_taskList: Array<Task> = [
  new Task(
    testing_data_dataFromDB[5]._id.toString(),
    "task6",
    new Date("2000-01-01"),
    "pending"
  ),
  new Task(
    testing_data_dataFromDB[4]._id.toString(),
    "task5",
    new Date("2020-01-01"),
    "pending"
  ),
  new Task(testing_data_dataFromDB[2]._id.toString(), "task3", null, "pending"),
  new Task(testing_data_dataFromDB[3]._id.toString(), "task4", null, "pending"),
  new Task(
    testing_data_dataFromDB[0]._id.toString(),
    "task1",
    null,
    "accomplished"
  ),
  new Task(
    testing_data_dataFromDB[1]._id.toString(),
    "task2",
    null,
    "accomplished"
  ),
];

describe("Test class TaskManager", () => {
  const numberedTaskList = new NumberedTaskList(testing_data_taskList);
  const connector = new DatabaseConnector("uri");
  const mockedConnectorInstance = mocked(connector);
  const taskManager = new TaskManager(mockedConnectorInstance);

  test("readTask() method should call private prepareNumberedTaskList and finaly return NumberedTaskList with instances of Task class", async () => {
    mockedConnectorInstance.getDataFromDB.mockResolvedValue(
      testing_data_dataFromDB
    );
    expect(numberedTaskList.getList()).toEqual(testing_data_indexedTasks);
  });

  test("createTask() method should  prepare prepareValidData and should call insertDataToDB() method from repositoryConnector", async () => {
    const testing_data_userInputData: UserInputData = {
      name: "task to insert",
      date: "1980-01-01",
      time: "",
    };

    const testing_data_insertData: InsertData = {
      name: "task to insert",
      date: new Date("1980-01-01"),
      status: "pending",
    };

    taskManager.createTask(testing_data_userInputData);
    expect(mockedConnectorInstance.insertDataToDB).toHaveBeenCalled();
    expect(mockedConnectorInstance.insertDataToDB).toHaveBeenCalledWith(
      testing_data_insertData
    );
  });

  test("getTaskId() find task id and return it or return null if not found", () => {
    const notExistingUserNumber = "100";
    const searchedNumber = "2";
    const taskId = taskManager.getTaskId(
      searchedNumber,
      testing_data_indexedTasks
    );
    expect(taskId).toEqual(testing_data_dataFromDB[4]._id.toString());
    const notExistingTask = taskManager.getTaskId(
      notExistingUserNumber,
      testing_data_indexedTasks
    );
    expect(notExistingTask).toEqual(null);
  });

  test("modifyStatus() method should return object {filter: { _id: '3'}  update: { $set: { status: 'accomplished' } }} ", () => {
    const filter = {
      _id: new ObjectId(testing_data_dataFromDB[4]._id.toString()),
    };
    const update = { $set: { status: "accomplished" } };
    const taskManager = new TaskManager(mockedConnectorInstance);
    taskManager.updateTask(testing_data_dataFromDB[4]._id.toString());
    expect(mockedConnectorInstance.updateDB).toBeCalledWith(filter, update);
  });
});
