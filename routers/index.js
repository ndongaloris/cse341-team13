const router = require("express").Router();
const institutions = require("./institution")
const degree = require("./degree")

router.use("/degree", degree);
router.use("/institution", institutions);

router.get("/", (req, res) =>{
    res.send("So far good");
})

module.exports = router;