const { Router } = require("express");
const { showDataOrdered, showDataJson } = require("../controllers/scrapper");
const router = Router();
router.get("/scrapper",showDataOrdered);
router.get("/scrapper-json",showDataJson);
router.get("/",(req,res)=> res.redirect("/scrapper"));
module.exports = router;
