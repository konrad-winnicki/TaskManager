import { DatabaseConnector } from "./classes/DatabaseConnector";
import { TaskManager } from "./classes/TaskManager";
import { UserManager, UserInputData } from "./classes/UserManager";
import {
  taskDescriptionFormSchema,
  taskModifyFormSchema,
  userInterfaceSchema,
} from "./prompt/schema";
import {
  appConsole,
  taskDescriptionForm,
  taskToModifyForm,
} from "./prompt/functions";
import { NumberedTaskList } from "./classes/NumberedTaskList";

const uri = "mongodb://127.0.0.1:27017";

const databaseConnector = new DatabaseConnector(uri);
const taskManager = new TaskManager(databaseConnector);
const userManager = new UserManager(taskManager);
const numberedTaskList = new NumberedTaskList([]);

export async function run(
  userManager: UserManager,
  numberedTaskList: NumberedTaskList
) {
  let currentTaskList = numberedTaskList;
  const response = await appConsole(userInterfaceSchema);
  switch (response) {
    case "q":
      console.log("Program finished");
      return;
    case "a":
      await taskDescriptionForm(taskDescriptionFormSchema)
        .then((result) => {
          userManager.createTask(result as unknown as UserInputData);
        })
        .catch((err) => console.log("error:", err));
      break;
    case "s":
      currentTaskList = await userManager.readTask();
      userManager.showTable(currentTaskList.getList());
      break;
    case "m":
      await taskToModifyForm(taskModifyFormSchema)
        .then((userIndex) => {
          userManager.updateTask(userIndex, numberedTaskList.getList());
        })
        .catch((err) => console.log("error:", err));

      break;
    case "del":
      await taskToModifyForm(taskModifyFormSchema)
        .then((userIndex) => {
          userManager.deleteTask(userIndex, numberedTaskList.getList());
        })
        .catch((err) => console.log("error:", err));
      break;
  }

  run(userManager, currentTaskList);
}

run(userManager, numberedTaskList);
