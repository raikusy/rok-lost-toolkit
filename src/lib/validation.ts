import { Schema, ZodSchema } from "zod";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";

const options: ErrorMessageOptions = {
  delimiter: {
    error: " ",
  },
  path: {
    enabled: false,
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    transform: ({ value }) => `${value}`,
  },
  transform: ({ errorMessage }) => `Error: ${errorMessage}\n`,
};

export const applyValidation = <T extends Zod.infer<Schema>>(
  schema: ZodSchema,
  input: T
): T => {
  const result = schema.safeParse(input);
  if (!result.success) {
    process.env.NODE_ENV === "development" &&
      console.debug(result.error.issues);
    const errorMessage = generateErrorMessage(result.error.issues, options);
    throw new Error(errorMessage);
  }

  return result.data;
};
