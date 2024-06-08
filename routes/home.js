const express = require("express");
const router = express.Router();

const { home, health } = require("../controllers/home");

router.route("/").get(home);
router.route("/health").get(health);

module.exports = router;
