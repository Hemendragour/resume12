// import { Router } from "express";

//  import { protect } from "../../middleware/auth.middleware";

// import {
//   generateSummary,
//   rewriteExperience,
//   suggestSkills,
//   generateProject,
// } from "./ai.controller";

// const router = Router();

// router.use(protect);

// router.post(
//   "/rewrite-experience",
//   rewriteExperience
// );

// router.post(
//   "/suggest-skills",
//   suggestSkills
// );

// router.post(
//   "/generate-project",
//   generateProject
// );

// router.post("/generate-summary", generateSummary);

// export default router;

import { Router } from "express";

import {
  generateSummary,
  rewriteExperience,
  suggestSkills,
  generateProject,
  generateExperience,
} from "./ai.controller";

import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/summary", generateSummary);

router.post(
  "/rewrite-experience",
  rewriteExperience
);

router.post(
  "/suggest-skills",
  suggestSkills
);

router.post(
  "/project",
  generateProject
);

router.post(
  "/experience",
  generateExperience
);

export default router;