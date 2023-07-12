import { Task } from "./Task";
import { TaskSorter } from "./TaskSorter";

export interface IndexedTasks {
  id: string;
  userIndex: number;
  name: string;
  deadline: Date | null;
  status: string;
}

export class NumberedTaskList {
  private taskWithOrderNumber: Array<IndexedTasks>;
  constructor(tasks: Array<Task>) {
    this.taskWithOrderNumber = this.assignateNumberToTask(tasks);
  }

  public assignateNumberToTask(tasks: Array<Task>): Array<IndexedTasks> {
    const sorter = new TaskSorter();
    const sortedTasks = sorter.sortTasksByDateAndStatus(tasks);
    return sortedTasks.map((item, index): IndexedTasks => {
      return {
        ...item.getTaskDetails(),
        userIndex: index + 1,
      };
    });
  }

  public getList(): Array<IndexedTasks> {
    return this.taskWithOrderNumber;
  }
}
