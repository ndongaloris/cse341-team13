const router = require("express").Router();
const degreeController = require("../controllers/degree");
const { isAuthenticated } = require("../middleware/authenticate");

/**
 * * Route to get all degrees.
 * * GET /
 * * Calls degreeController.getAll function.
 */
router.get("/",isAuthenticated, degreeController.getAll);

/**
 * * Route to get a single degree by ID.
 * * GET /:id
 * * Calls degreeController.getSingle function.
 * * @param {string} id - The ID of the degree to retrieve.
 */
router.get("/:id", degreeController.getSingle);

/**
 * * Route to create a new degree.
 * * POST /create
 * * Calls degreeController.createDegree function.
 * * Expects JSON body with degree details.
 */
router.post("/create", isAuthenticated, degreeController.createDegree);

/**
 * * Route to update a degree by ID.
 * * PUT /update/:id
 * * Calls degreeController.updateDegree function.
 * * @param {string} id - The ID of the degree to update.
 * * Expects JSON body with updated degree details.
 */
router.put("/update/:id",  degreeController.updateDegree);

/**
 * * Route to delete a degree by ID.
 * * DELETE /delete/:id
 * * Calls degreeController.deleteDegree function.
 * * @param {string} id - The ID of the degree to delete.
 */
router.delete("/delete/:id", degreeController.deleteDegree);

module.exports = router;
