const express = require("express");
const { getCoupons, applyCoupon } = require("../controllers/couponController");

const router = express.Router();

/* ================= PUBLIC COUPON ROUTES ================= */

// Get all active coupons
router.get("/", getCoupons);

// Apply coupon code
router.post("/apply", applyCoupon);

module.exports = router;