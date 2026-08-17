import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import resumeRoutes from "../modules/resume/resume.routes";
import exportRoutes from "../modules/export/export.routes";
import aiRoutes from "../modules/ai/ai.routes";
// import atsRoutes from "../modules/ats/ats.routes";
import { aiRateLimiter } from "../middleware/aiRateLimit.middleware";
import uploadRoutes from "../modules/upload/upload.routes";
// import { protect } from "../middleware/auth.middleware";
import atsRoutes from "../modules/ats/ats.routes";
import analyticsRoutes
from "../modules/analytics/analytics.routes";
import versionRoutes
from "../modules/version/version.routes";

import adminRoutes
from "../modules/admin/admin.routes";

import dashboardRoutes
from "../modules/dashboard/dashboard.routes";


const router = Router();
// router.use(protect);

router.use(aiRateLimiter);

router.use("/auth", authRoutes);

router.use("/resumes", resumeRoutes);

router.use("/export", exportRoutes);

router.use("/ai", aiRoutes);

// router.use("/ats", atsRoutes);

router.use(
  "/analytics",
  analyticsRoutes
);

router.use(
  "/versions",
  versionRoutes
);

router.use(
  "/admin",
  adminRoutes
);

router.use(
  "/dashboard",
  dashboardRoutes
);


router.use("/ats", atsRoutes);


router.use("/upload", uploadRoutes);
export default router;