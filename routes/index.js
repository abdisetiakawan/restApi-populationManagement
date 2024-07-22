var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Aplikasi Pengelolaan data penduduk dan Pengajuan",
  });
});

module.exports = router;
