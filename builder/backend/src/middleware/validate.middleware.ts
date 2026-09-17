import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest =
  (schema: z.AnyZodObject | z.ZodEffects<any> | z.ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
