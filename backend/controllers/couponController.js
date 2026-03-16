const { Coupon } = require("../models")

exports.getCoupons = async (req, res) => {

try{

const coupons = await Coupon.findAll({
where: { isActive: true },
attributes: ["id", "code", "discountType", "discountValue", "expiryDate"],
order: [["createdAt", "DESC"]]
})

res.json(coupons)

}catch(error){

console.error("Coupon Fetch Error:", error)

res.status(500).json({
message: "Failed to fetch coupons",
error: error.message
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
where:{ code, isActive: true }
})

if(!coupon){

return res.status(404).json({
message:"Invalid coupon"
})

}

// Check if coupon is expired
if(coupon.expiryDate && new Date() > new Date(coupon.expiryDate)){

return res.status(400).json({
message:"Coupon has expired"
})

}

res.json({
code: coupon.code,
discountType: coupon.discountType,
discountValue: coupon.discountValue,
message: "Coupon applied successfully"
})

}catch(error){

console.error("Coupon Apply Error:", error)

res.status(500).json({
message:"Coupon apply failed",
error: error.message
})

}

}