import prompt from "prompt";

export function taskDescriptionForm(
  schemaType: prompt.Schema
): Promise<prompt.Properties> {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(schemaType, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.response == "c") {
        reject(console.log("aborted"));
      } else {
        resolve(result);
      }
    });
  });
}

export function taskToModifyForm(schemaType: prompt.Schema): Promise<string> {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(schemaType, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.response == "c") {
        reject(console.log("aborted"));
      } else {
        resolve(result.response as string);
      }
    });
  });
}

export function appConsole(schemaType: prompt.Schema): Promise<string> {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(schemaType, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.command as unknown as string);
      }
    });
  });
}
