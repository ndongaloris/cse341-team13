const router = require("express").Router();
const degreeController = require("../controllers/degree");

router.get("/", degreeController.getAll);
router.get("/:id", degreeController.getSingle);
router.post("/create", degreeController.createDegree);
router.put("/update/:id",degreeController.updateDegree);
router.delete("/delete/:id", degreeController.deleteDegree);

module.exports = router;