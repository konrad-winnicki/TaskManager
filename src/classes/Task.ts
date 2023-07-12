export interface TaskDetails {
  id: string;
  name: string;
  deadline: Date | null;
  status: string;
}

export class Task {
  private id: string;
  private name: string;
  private deadline: Date | null;
  private status: string;
  constructor(id: string, name: string, deadline: Date | null, status: string) {
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.status = status;
  }

  public getTaskDetails(): TaskDetails {
    return {
      id: this.id,
      name: this.name,
      deadline: this.deadline,
      status: this.status,
    };
  }
}
