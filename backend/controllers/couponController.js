const { Coupon } = require("../models")

exports.getCoupons = async (req, res) => {

try{

const coupons = await Coupon.findAll()

res.json(coupons)

}catch(error){

console.error("Coupon Fetch Error:", error)

res.status(500).json({
message: "Failed to fetch coupons"
})

}

}



exports.applyCoupon = async (req, res) => {

try{

const { code } = req.body

if(!code){

return res.status(400).json({
message:"Coupon code required"
})

}

const coupon = await Coupon.findOne({
where:{ code }
})

if(!coupon){

return res.status(404).json({
message:"Invalid coupon"
})

}

res.json({
discount: coupon.discount
})

}catch(error){

console.error("Coupon Apply Error:", error)

res.status(500).json({
message:"Coupon apply failed"
})

}

}