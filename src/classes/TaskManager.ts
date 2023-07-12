import { IndexedTasks, NumberedTaskList } from "./NumberedTaskList";
import { Task } from "./Task";
import { DatabaseConnector, Document } from "./DatabaseConnector";
import { WithId, ObjectId } from "mongodb";

export type UserInputData = {
  name: string;
  date: string;
  time: string;
};

export type InsertData = {
  name: string;
  date: Date | null;
  status: string;
};

type UpdateTask = {
  filter: { _id: ObjectId };
  update: { $set: { status: string } };
};

export class TaskManager {
  repositoryConnector: DatabaseConnector;
  constructor(repositoryConnector: DatabaseConnector) {
    this.repositoryConnector = repositoryConnector;
  }

  private prepareNumberedTaskList(
    documents: Array<WithId<Document>>
  ): NumberedTaskList {
    const taskList = documents.map((x: WithId<Document>) => {
      return new Task(x._id.toString(), x.name, x.date, x.status);
    });
    return new NumberedTaskList(taskList);
  }

  public async readTask(): Promise<NumberedTaskList> {
    const documents = await this.repositoryConnector.getDataFromDB();
    return this.prepareNumberedTaskList(documents);
  }

  private prepareValidData(data: UserInputData): InsertData {
    return {
      name: data.name,
      date: data.date != "" ? new Date(`${data.date}:${data.time}Z`) : null,
      status: "pending",
    };
  }

  public createTask(data: UserInputData) {
    const validData = this.prepareValidData(data);
    this.repositoryConnector.insertDataToDB(validData);
  }

  public getTaskId(item: string, taskList: Array<IndexedTasks>): string | null {
    if (Number(item) <= 0 || Number(item) > taskList.length) {
      return null;
    }
    const index = Number(item) - 1;
    return taskList[index].id;
  }

  public deleteTask(taskId: string) {
    this.repositoryConnector.deleteDataFromDB(taskId);
  }

  private modifyStatus(taskId: string): UpdateTask {
    const filter = { _id: new ObjectId(taskId) };
    const update = { $set: { status: "accomplished" } };
    return { filter, update };
  }

  public updateTask(taskId: string) {
    const taskToUpdate = this.modifyStatus(taskId);
    this.repositoryConnector.updateDB(taskToUpdate.filter, taskToUpdate.update);
  }
}
