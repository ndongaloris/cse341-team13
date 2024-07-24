const router = require("express").Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authenticate");

//*********************** Routers *********************/

/**
 * * Route to get all users.
 * * GET /
 * * Calls userController.getAll function.
 */
router.get("/", isAuthenticated, userController.getAllUsers);

/**
 * * Route to get a single user by ID.
 * * GET /:id
 * * Calls userController.getSingle function.
 * * @param {string} id - The ID of the user to retrieve.
 */
router.get("/:id", userController.getSingleUser);

/**
 * * Route to create a new user.
 * * POST /create
 * * Calls userController.createUser function.
 * * Expects JSON body with user details.
 */
router.post("/", isAuthenticated, userController.createUser);

/**
 * * Route to update a user by ID for admin.
 * * PUT /update/:id
 * * Calls userController.updateUser function.
 * * @param {string} id - The ID of the user to update.
 * * Expects JSON body with updated user details.
 */
router.put("/:id", isAuthenticated, userController.updateUser);

/**
 * * Route to update a user by ID for all users
 * * PUT /update/:id
 * * Calls userController.updateMe function.
 * * @param {string} id - The ID of the user to update.
 * * Expects JSON body with updated user details.
 */
router.put("/me/:id", isAuthenticated, userController.updateMe);

/**
 * * Route to delete a user by ID.
 * * DELETE /delete/:id
 * * Calls userController.deleteUser function.
 * * @param {string} id - The ID of the user to delete.
 */
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
