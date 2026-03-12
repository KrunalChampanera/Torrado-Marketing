const router = require("express").Router()

const {
getCoupons,
applyCoupon
} = require("../controllers/couponController")

router.get("/", getCoupons)

router.post("/apply", applyCoupon)

module.exports = router