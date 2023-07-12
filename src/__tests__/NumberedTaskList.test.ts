import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { Task } from "../classes/Task";
import { NumberedTaskList } from "../classes/NumberedTaskList";

describe("Test class NumberedTaskList", () => {
  const testing_task1 = new Task("1", "task1", null, "acomplished");
  const testing_task2 = new Task("2", "task2", null, "acomplished");
  const testing_task3 = new Task("3", "task3", null, "pending");

  const expectedResult = [
    { userIndex: 1, id: "3", name: "task3", deadline: null, status: "pending" },
    {
      userIndex: 2,
      id: "1",
      name: "task1",
      deadline: null,
      status: "acomplished",
    },
    {
      userIndex: 3,
      id: "2",
      name: "task2",
      deadline: null,
      status: "acomplished",
    },
  ];

  test("asignateNumberToTask() method return list of objects containing ordinal number and task", () => {
    const numberedTaskList = new NumberedTaskList([testing_task1, testing_task2, testing_task3]);
    expect(
      numberedTaskList.assignateNumberToTask([testing_task1, testing_task2, testing_task3])
    ).toEqual(expectedResult);
  });

  test("getList() method return array with objects containing with ordinal number and task key:value pairs", () => {
    const numberedTaskList = new NumberedTaskList([testing_task1, testing_task2, testing_task3]);
    expect(numberedTaskList.getList()).toEqual(expectedResult);
  });
});
