

const express = require("express");
const { createSectionController, deleteSectionController, getAllSectionController, getSectionByIdController } = require("../controllers/sectionController");
const router = express.Router();

router.post("/create", createSectionController);
router.post("/delete", deleteSectionController);
router.get("/getAllsection", getAllSectionController);
router.get("/section/:id", getSectionByIdController);



module.exports = router;
