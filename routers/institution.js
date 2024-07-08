const router = require("express").Router();
const institutionController = require("../controllers/institutions")

router.get("/", institutionController.getAll);
router.get("/:id", institutionController.getSingle);
router.post("/create", institutionController.createInstitution);
router.put("/update/:id",institutionController.updateInstitution);
router.delete("/delete/:id", institutionController.deleteInstitution);

module.exports = router;