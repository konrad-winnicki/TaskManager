import { describe, expect, test } from "@jest/globals";
import { Task } from "../classes/Task";

describe("Test class Task", () => {
  test("initialize instance of class Task", () => {
    const task = new Task("string", "string", new Date("1999-01-01"), "string");
    expect(task).toBeInstanceOf(Task);
  });

  test('constructor should contain id: "string", name:"string", deadline: new Date("1999-01-01"), status: "string"', (): void => {
    const task = new Task("string", "string", new Date("1999-01-01"), "string");
    expect(task).toEqual({
      id: "string",
      name: "string",
      deadline: new Date("1999-01-01"),
      status: "string",
    });
  });

  test("getTaskDetails() should be a class method", () => {
    const task = new Task("string", "string", null, "string");
    expect(typeof task.getTaskDetails).toBe("function");
  });

  test("getTaskDetails() should return object", () => {
    const task = new Task("string", "string", null, "string");
    const object = {
      id: "string",
      name: "string",
      deadline: null,
      status: "string",
    };
    expect(task.getTaskDetails()).toStrictEqual(object);
  });
});
