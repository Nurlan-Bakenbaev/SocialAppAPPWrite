import * as z from "zod";
export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Add at least 2 characters" }).max(50),
  username: z.string().min(2, { message: "Add at least 2 characters" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Add minimum 6 characters" }),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Add minimum 6 characters" }),
});
export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(60),
  tags: z.string(),
});
