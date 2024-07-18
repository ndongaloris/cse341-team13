const router = require("express").Router();
const institutionController = require("../controllers/institutions");
const { isAuthenticated } = require("../middleware/authenticate");
/**
 * Route to get all institutions.
 * GET /
 * Calls institutionController.getAll function.
 */
router.get("/", institutionController.getAll);

/**
 * Route to get a single institution by ID.
 * GET /:id
 * Calls institutionController.getSingle function.
 * @param {string} id - The ID of the institution to retrieve.
 */
router.get("/:id", institutionController.getSingle);

/**
 * Route to create a new institution.
 * POST /create
 * Calls institutionController.createInstitution function.
 * Expects JSON body with institution details.
 */
router.post("/create", isAuthenticated, institutionController.createInstitution);

/**
 * Route to update an institution by ID.
 * PUT /update/:id
 * Calls institutionController.updateInstitution function.
 * @param {string} id - The ID of the institution to update.
 * Expects JSON body with updated institution details.
 */
router.put("/update/:id", isAuthenticated, institutionController.updateInstitution);

/**
 * Route to delete an institution by ID.
 * DELETE /delete/:id
 * Calls institutionController.deleteInstitution function.
 * @param {string} id - The ID of the institution to delete.
 */
router.delete("/delete/:id", isAuthenticated, institutionController.deleteInstitution);

module.exports = router;
