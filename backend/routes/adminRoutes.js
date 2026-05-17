import express from "express";
import {
  getAdminStats,
  getAllBookings,
  getAllEquipment,
  getAllUsers,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);
router.get("/equipment", authMiddleware, adminMiddleware, getAllEquipment);

export default router;
