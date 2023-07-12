import { Task } from "./Task";

export class TaskSorter {
  private compareStatus(statusA: string, statusB: string): -1 | 0 | 1 {
    if (statusA === statusB) {
      return 0;
    } else if (statusA === "pending") {
      return -1;
    }
    return 1;
  }
  private compareDeadlines(
    deadlineA: Date | null,
    deadlineB: Date | null
  ): -1 | 0 | 1 {
    if (deadlineA === null && deadlineB === null) {
      return 0;
    } else if (deadlineA === null) {
      return 1;
    } else if (deadlineB === null) {
      return -1;
    } else if (deadlineA < deadlineB) {
      return -1;
    } else if (deadlineA > deadlineB) {
      return 1;
    }
    return 0;
  }

  public sortTasksByDateAndStatus(taskList: Array<Task>): Array<Task> {
    return taskList.sort((a, b) => {
      const comparedByStatus = this.compareStatus(
        a.getTaskDetails().status,
        b.getTaskDetails().status
      );
      if (comparedByStatus != 0) {
        return comparedByStatus;
      }

      const comparedByDeadline = this.compareDeadlines(
        a.getTaskDetails().deadline,
        b.getTaskDetails().deadline
      );
      return comparedByDeadline;
    });
  }
}
