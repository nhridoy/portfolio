import * as z from "zod";

const sendEmailSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  services: z.array(z.string()).min(1),
  budget: z.string().optional(),
  message: z.string().max(3000).min(1),
});

type sendEmailSchemaType = z.infer<typeof sendEmailSchema>;

export { sendEmailSchema, type sendEmailSchemaType };
