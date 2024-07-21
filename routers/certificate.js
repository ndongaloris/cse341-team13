const router = require("express").Router();
const certificateController = require("../controllers/certificate");
const { isAuthenticated } = require("../middleware/authenticate");


/**
 * Route to get all certificates.
 * GET /
 * Calls certificateController.getAll function.
 */
router.get("/", certificateController.getAll);

/**
 * Route to get a single certificate by ID.
 * GET /:id
 * Calls certificateController.getSingle function.
 * @param {string} id - The ID of the certificate to retrieve.
 */
router.get("/:_id", certificateController.getSingle);

/**
 * Route to create a new certificate.
 * POST /create
 * Calls certificateController.createcertificate function.
 * Expects JSON body with certificate details.
 */
router.post("/create", isAuthenticated, certificateController.createCertificate);

/**
 * Route to update a certificate by ID.
 * PUT /update/:id
 * Calls certificateController.updatecertificate function.
 * @param {string} id - The ID of the certificate to update.
 * Expects JSON body with updated certificate details.
 */
router.put("/update/:_id", isAuthenticated, certificateController.updateCertificate);

/**
 * Route to delete a certificate by ID.
 * DELETE /delete/:id
 * Calls certificateController.deletecertificate function.
 * @param {string} id - The ID of the certificate to delete.
 */
router.delete("/delete/:_id", isAuthenticated, certificateController.deleteCertificate);

module.exports = router;
