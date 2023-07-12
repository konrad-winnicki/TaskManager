import prompt from "prompt";

export const taskDescriptionFormSchema: prompt.Schema = {
  properties: {
    name: {
      description: "Indicate task name",
      pattern: /[a-zA-z0-9\-]+$|c/,
      message:
        "Wrong format.\n Only letters numbers and '-' are allowed.\nIndicate c if you want to abort.\n",
      required: true,
    },
    date: {
      description:
        "Indicate date in format YYYY-MM-DD (skip if not applicable)\n\t_",
      pattern: /[0-9]{4}[-][0-9]{2}[-][0-9]{2}|c/,
      message: "Wrong date format. Indicate c if you want to abort.\n",
      required: false,
    },
    time: {
      description:
        "Indicate time in format HH:MM (skip if not applicable)\n\t_",
      pattern: /[0-9]{2}[:][0-9]{2}|c/,
      message: "Wrong format. Indicate c if you want to abort.\n",
      required: false,
    },
  },
};

export const taskModifyFormSchema: prompt.Schema = {
  properties: {
    response: {
      description: "Indicate UserIndex",
      pattern: /[0-9]+|c/,
      message:
        "Input can not contain numbers. Indicate c if you want to abort.\n",
      required: true,
    },
  },
};

export const userInterfaceSchema: prompt.Schema = {
  properties: {
    command: {
      description:
        "Options: \n s -  show tasks \n a - add task\n m - set accomplished \n del - delete\n c - to abort \n q - quit\n\t Indicate command",
      pattern: /a|q|s|m|del/,
      message: "Wrong command ",
      required: true,
    },
  },
};
