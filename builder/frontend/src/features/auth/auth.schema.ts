// import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.email("Invalid email"),

//   password: z.string().min(6),
// });

// export const registerSchema = z.object({
//   fullName: z.string().min(3),

//   email: z.email("Invalid email"),

//   password: z.string().min(6),
// });

// export type LoginFormData =
//   z.infer<typeof loginSchema>;

// export type RegisterFormData =
//   z.infer<typeof registerSchema>;


import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(
    6,
    "Password must be at least 6 characters"
  ),
});

export const registerSchema = z.object({
  fullName: z.string().min(
    3,
    "Full name must be at least 3 characters"
  ),

  email: z.string().email("Invalid email"),

  password: z.string().min(
    6,
    "Password must be at least 6 characters"
  ),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;

export type RegisterFormData =
  z.infer<typeof registerSchema>;