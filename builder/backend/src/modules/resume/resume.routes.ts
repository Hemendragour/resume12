import { Router } from "express";

import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  shareResume,
  disableShareResume,
  getPublicResume,
} from "./resume.controller";

import { protect } from "../../middleware/auth.middleware";



const router = Router();
router.get("/public/:shareId", getPublicResume);

router.use(protect);

router.post("/", createResume);

router.get("/", getResumes);

router.get("/:id", getResumeById);
router.patch("/:id", updateResume);

router.delete("/:id", deleteResume);
router.post("/:id/duplicate", duplicateResume);

router.post("/:id/share", shareResume);

router.delete("/:id/share", disableShareResume);

export default router;