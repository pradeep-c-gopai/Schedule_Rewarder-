const router = require("express").Router();

const points = require("../controller/points");

router.get("/getPointList", points.getPoints);

router.post("/getPoint", points.getPointsByWallet);

module.exports = router;