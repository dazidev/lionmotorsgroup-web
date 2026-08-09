import { z } from "zod";
import { leadMessages } from "../lead/lead.messages";

const messagesByEntity = {
  lead: leadMessages,
};

type EntityType = keyof typeof messagesByEntity;

export function getSchemaErrorMessage(
  error: z.ZodError,
  entity: EntityType,
  environment: "frontend" | "backend",
) {
  const issue = error.issues[0];

  if (!issue) {
    return "Invalid data.";
  }

  const field = issue.path[0];

  if (typeof field !== "string") {
    return "Invalid data.";
  }

  const messages = messagesByEntity[entity][environment];

  if (!(field in messages)) {
    return "Invalid data.";
  }

  const fieldMessages = messages[field as keyof typeof messages];

  switch (issue.code) {
    case "too_small":
      return "required" in fieldMessages
        ? fieldMessages.required
        : "Invalid value.";

    case "too_big":
      return "max" in fieldMessages ? fieldMessages.max : "Invalid value.";

    case "invalid_format":
    case "invalid_value":
      return "invalid" in fieldMessages
        ? fieldMessages.invalid
        : "Invalid value.";

    default:
      return "Invalid value.";
  }
}
