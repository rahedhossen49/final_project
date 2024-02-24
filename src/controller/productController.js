const {
  saveProductService,
  getProductByIdService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  findProductByBrandService,
  findProductByCategoryService,
  findProductByNameService,
  brandListService,
  categoryListService,
  listByFilterService,
} = require("../service/productService");

const addProduct = async (req, res) => {
  const result = await saveProductService(req);

  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
const getSingleProduct = async (req, res) => {
  const result = await getProductByIdService(req);
  return res.status(200).json(result);
};
const getAllProduct = async (req, res) => {
  const result = await getAllProductService(req);
  return res.status(200).json(result);
};
const productUpdate = async (req, res) => {
  const result = await updateProductService(req);
  return res.status(200).json(result);
};
const productDelete = async (req, res) => {
  const result = await deleteProductService(req);
  return res.status(200).json(result);
};
const findProductByBrand = async (req, res) => {
  const result = await findProductByBrandService(req);
  return res.status(200).json(result);
};
const findProductByCategory = async (req, res) => {
  const result = await findProductByCategoryService(req);
  return res.status(200).json(result);
};
const findProductByName = async (req, res) => {
  const result = await findProductByNameService(req);
  return res.status(200).json(result);
};
const productBrandList=async(req,res)=>{
  let result=await brandListService();
  return res.status(200).json(result)
}
const categoryList=async(req,res)=>{
  let result=await categoryListService();
  return res.status(200).json(result)
}

const productListByFilter=async(req,res)=>{
  let result=await listByFilterService(req);
  return res.status(200).json(result)
}
module.exports = {
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
  productListByFilter
};
