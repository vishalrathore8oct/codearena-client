import { z } from "zod";
import { createProblemSchema } from "../validations/createProblemSchema";

export type CreateProblemFormValues = z.infer<
  typeof createProblemSchema.shape.body
>;
