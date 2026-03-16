const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const productController = require("../controllers/productController");
const { getCoupons, applyCoupon } = require("../controllers/couponController");

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

router.get("/", productController.getAllProducts);

router.get("/top-deals", productController.getTopDealProducts);

router.get("/popular", productController.getPopularProducts);

router.get("/:id", productController.getSingleProduct);

/* ================= ADMIN ROUTES ================= */

router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  productController.createProduct
);

router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/:id",
  auth,
  admin,
  productController.deleteProduct
);

module.exports = router;