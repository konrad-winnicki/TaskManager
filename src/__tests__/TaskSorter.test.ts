import { describe, expect, test, jest } from "@jest/globals";
import { Task } from "../classes/Task";
import { TaskSorter } from "../classes/TaskSorter";

describe("Test class TaskSorter", () => {
  const task1 = new Task("1", "task1", null, "acomplished");
  const task2 = new Task("2", "task2", null, "acomplished");
  const task3 = new Task("3", "task3", null, "pending");
  const task4 = new Task("4", "task4", null, "pending");
  const task5 = new Task("5", "task5", new Date("2020-01-01"), "pending");
  const task6 = new Task("6", "task6", new Date("2000-01-01"), "pending");

  const taskSorter = new TaskSorter();

  test("Initialize instance of class TaskSorter", () => {
    expect(taskSorter).toBeInstanceOf(TaskSorter);
  });

  test("sortTasksByDateAndStatus() method should be called with list of tasks", () => {
    const methodSpy = jest.spyOn(taskSorter, "sortTasksByDateAndStatus");
    taskSorter.sortTasksByDateAndStatus([task1, task5]);
    expect(methodSpy).toHaveBeenCalled();
  });

  test.each([
    [
      [task1, task2, task3, task4],
      [task3, task4, task1, task2],
    ],
    [
      [task3, task2, task1, task4],
      [task3, task4, task2, task1],
    ],
    [
      [task2, task4, task1, task3],
      [task4, task3, task2, task1],
    ],
    [
      [task4, task3, task1, task2],
      [task4, task3, task1, task2],
    ],
  ])(
    "sortTasksByDateAndStatus() method should return array ordered by status",
    (input, expected) => {
      const sorted = taskSorter.sortTasksByDateAndStatus(input);
      expect(sorted).toEqual(expected);
    }
  );

  test.each([
    [
      [task1, task2, task3, task4, task5, task6],
      [task6, task5, task3, task4, task1, task2],
    ],
    [
      [task4, task2, task1, task3, task5, task6],
      [task6, task5, task4, task3, task2, task1],
    ],
    [
      [task2, task4, task1, task3, task5, task6],
      [task6, task5, task4, task3, task2, task1],
    ],
    [
      [task4, task3, task1, task2, task5, task6],
      [task6, task5, task4, task3, task1, task2],
    ],
  ])(
    "sortTasksByDateAndStatus() method should return array ordered by status and if status is pending, deadline = null should be listed are after deadline with asignated date ",
    (input, expected) => {
      const sorted = taskSorter.sortTasksByDateAndStatus(input);
      expect(sorted).toEqual(expected);
    }
  );
});
