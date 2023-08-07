import express from "express";
const router = express.Router();

const cropController = require("../../controllers/workoutController");

router.get("/", cropController.getAllCrops);

router.get("/:cropId", cropController.getOneCrop);

router.post("/", cropController.createNewCrop);

router.patch("/:cropId", cropController.updateOneCrop);

router.delete("/:cropId", cropController.deleteOneCrop);

export default router;
