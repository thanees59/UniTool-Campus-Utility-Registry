import express from "express";
import {
  addEquipment,
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "../controllers/equipmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getEquipment);

router.post("/", authMiddleware, adminMiddleware, addEquipment);

router.put("/:id", authMiddleware, adminMiddleware, updateEquipment);

router.delete("/:id", authMiddleware, adminMiddleware, deleteEquipment);

export default router;