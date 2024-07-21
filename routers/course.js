const router = require("express").Router();
const courseController = require("../controllers/course");
const { isAuthenticated } = require("../middleware/authenticate");

/**
 * Route to get all courses.
 * GET /
 * Calls courseController.getAll function.
 */
router.get("/", courseController.getAll);

/**
 * Route to get a single course by ID.
 * GET /:id
 * Calls courseController.getSingle function.
 * @param {string} id - The ID of the course to retrieve.
 */
router.get("/:id", courseController.getSingle);

/**
 * Route to create a new course.
 * POST /create
 * Calls courseController.createCourse function.
 * Expects JSON body with course details.
 */
router.post("/create",  isAuthenticated, courseController.createCourse);

/**
 * Route to update a course by ID.
 * PUT /update/:id
 * Calls courseController.updateCourse function.
 * @param {string} id - The ID of the course to update.
 * Expects JSON body with updated course details.
 */
router.put("/update/:id",  isAuthenticated, courseController.updateCourse);

/**
 * Route to delete a course by ID.
 * DELETE /delete/:id
 * Calls courseController.deleteCourse function.
 * @param {string} id - The ID of the course to delete.
 */
router.delete("/delete/:id", isAuthenticated,  courseController.deleteCourse);

module.exports = router;
