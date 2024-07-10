const router = require("express").Router();
const institution = require("./institution")
const degree = require("./degree")

router.use("/degree", degree);
router.use("/institution", institution);

router.get("/", (req, res) =>{
    res.send("So far good");
})

module.exports = router;