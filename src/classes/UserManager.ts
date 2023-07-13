import { IndexedTasks, NumberedTaskList } from "./NumberedTaskList";
import { TaskManager } from "./TaskManager";

export interface UserInputData {
  name: string;
  date: string;
  time: string;
}

interface UserInterface {
  createTask(data: UserInputData): void;
  readTask(): Promise<NumberedTaskList>;
  deleteTask(userIndex: string, taskList: Array<IndexedTasks>): void;
  updateTask(userIndex: string, taskList: Array<IndexedTasks>): void;
}

export class UserManager implements UserInterface {
  taskManager: TaskManager;
  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  public showTable(taskList: Array<IndexedTasks>): void {
    if (taskList.length != 0) {
      console.table(taskList);
    } else {
      console.log("There are no tasks to show!");
    }
  }

  async readTask(): Promise<NumberedTaskList> {
    const tasks = await this.taskManager.readTask();
    return tasks;
  }

  createTask(data: UserInputData) {
    this.taskManager.createTask(data);
  }

  deleteTask(userIndex: string, taskList: Array<IndexedTasks>) {
    const taskId = this.taskManager.getTaskId(userIndex, taskList);
    if (taskId == null) {
      console.log("Task with this number does not exist!");
    } else if (typeof taskId === "string") {
      this.taskManager.deleteTask(taskId);
    }
  }

  updateTask(userIndex: string, taskList: Array<IndexedTasks>) {
    const taskId = this.taskManager.getTaskId(userIndex, taskList);
    if (taskId == null) {
      console.log("Task with this number does not exist!");
    } else {
      this.taskManager.updateTask(taskId);
    }
  }
}
