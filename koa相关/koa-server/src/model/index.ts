const mongoose = require("mongoose");
const seller = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});
// 商家销售
const sellerModel = mongoose.model("seller", seller);

// 趋势
const trend = new mongoose.Schema({
  map: {
    title: String,
    base: Number,
    unit: String,
    data: [Object]
  },
  seller: {
    title: String,
    base: Number,
    unit: String,
    data: [Object]
  },
  common: {
    month: [String]
  },
  commodity: {
    title: String,
    base: Number,
    unit: String,
    data: [Object]
  },
  type: [Object]
});
const trendModel = mongoose.model("trend", trend);
// 地图
const map = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  children: {
    type: [Object],
    required: true
  }
})
const mapModel = new mongoose.model("map", map);
const rank = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})
const rankModel = new mongoose.model("rank", rank);
const stock = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stock:{
    type:Number,
    required: true
  },
  sales: {
    type: Number,
    required: true
  }
})
const stockModel = new mongoose.model("stock", stock);
const product = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  children:{
    type:[Object],
    required: true
  }
})
const productModel = new mongoose.model("product", product);
export = {
  sellerModel,
  trendModel,
  mapModel,
  rankModel,
  productModel,
  stockModel
}