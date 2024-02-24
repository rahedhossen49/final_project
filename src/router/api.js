const express = require("express");
const {
  createUser,
  userVerification,
  userLogin,
  userLogout,
  updateImage,
  updatePassword,
  userProfile,
} = require("../controller/userController");
const AuthVerification = require("../middleware/AuthVerification");
const { saveProductService } = require("../service/productService");
const {
  addProduct,
  getSingleProduct,
  getAllProduct,
  productUpdate,
  productDelete,
  findProductByBrand,
  findProductByCategory,
  findProductByName,
  productBrandList,
  categoryList,
  productListByFilter,
} = require("../controller/productController");

const router = express.Router();

// user api
router.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

router.post("/create-user", createUser);
router.post("/verify/:email/:otp", userVerification);
router.post("/login", userLogin);
router.get("/logout", AuthVerification, userLogout);
router.put("/update-image", AuthVerification, updateImage);
router.put("/update-password", AuthVerification, updatePassword);
router.get("/profile", AuthVerification, userProfile);

router.post("/add-product", AuthVerification, addProduct);
router.get("/single-product/:id", AuthVerification, getSingleProduct);
router.get("/all-product", getAllProduct);
router.put("/update-product/:id", AuthVerification, productUpdate);
router.delete("/delete-product/:id", AuthVerification, productDelete);
router.post("/filter-product", productListByFilter);
router.get("/brand-list", productBrandList);
router.get("/categories-list", categoryList);

router.get("/sort-by-brand/:brand", findProductByBrand);
router.get("/sort-by-category/:category", findProductByCategory);
router.get("/search/:name", findProductByName);
module.exports = router;
