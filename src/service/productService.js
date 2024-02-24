const brandModel = require("../models/brand");
const categoryModel = require("../models/category");
const productModel = require("../models/product");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const saveProductService = async (req, res) => {
  try {
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    const newProduct = await productModel.create(reqBody);
    return { status: "success", data: newProduct };
  } catch (error) {
    console.log(error);
    return { status: "Fail", message: error };
  }
};

const getProductByIdService = async (req, res) => {
  try {
    let ProductID = new ObjectId(req.params.id);
    console.log(ProductID);
    let MatchStage = { $match: { _id: ProductID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
const getAllProductService = async (req, res) => {
  /* try {
    const email = req.headers.email;
    const product = await productModel.find({ email: email });
    return { status: "success", data: product };
  } catch (error) {
    return { status: "Fail", message: error };
  } */
  try {
    const email = req.headers.email;
    const product = await productModel.find({ email: email });
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

const updateProductService = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true }
    );
    if (!updatedProduct) {
      return { message: "Product not found" };
    }
    return { status: "Success", message: "Product update success" };
  } catch (error) {
    return { status: "Fail", message: error };
  }
};
const deleteProductService = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return { message: "Product not found" };
    }
    return { status: "success", message: "Product delete success" };
  } catch (error) {
    return { status: "Fail", message: error };
  }
};
const findProductByBrandService = async (req, res) => {
  try {
    let BrandID = new ObjectId(req.params.brand);
    let MatchStage = { $match: { brandID: BrandID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
      },
    };

    // Query
    let data = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
const findProductByCategoryService = async (req, res) => {
  try {
    let categoryID = new ObjectId(req.params.category);
    let MatchStage = { $match: { categoryID: categoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
      },
    };

    // Query
    let data = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
const findProductByNameService = async (req, res) => {
  try {
    let SearchRegex = { $regex: req.params.name, $options: "i" };
    let SearchParams = [{ name: SearchRegex }];

    let SearchQuery = { $or: SearchParams };
    let MatchStage = { $match: SearchQuery };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0 } };

    let data = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

const brandListService = async () => {
  try {
    let data = await brandModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
const categoryListService = async () => {
  try {
    let data = await categoryModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
const listByFilterService = async (req) => {
  try {
    let matchConditions = {};
    if (req.body["categoryID"]) {
      matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }
    if (req.body["brandID"]) {
      matchConditions.brandID = new ObjectId(req.body["brandID"]);
    }
    if (req.body["name"]) {
      matchConditions.name = { $regex: req.body["name"], $options: "i" };
    }
    let MatchStage = { $match: matchConditions };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let data = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", error: e.message };
  }
};

module.exports = {
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
};
