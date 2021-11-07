const { Router } = require("express");
const { showDataOrdered, showDataTables } = require("../controllers/scrapper");
const router = Router();
router.get("/scrapper",showDataOrdered);
router.get("/scrapper-table",showDataTables);
router.get("/",(req,res)=> res.redirect("/scrapper"));
module.exports = router;
