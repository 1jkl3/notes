const router = require("koa-router")();
const controller = require("../controller/index");
router.prefix("/api");
router.get("/seller", controller.getSellerList);
router.post("/addSeller", controller.addSeller);
router.get("/trend", controller.getTrendInfo);
router.post("/addTrend", controller.addTrendInfo);
router.get("/maps", controller.getMapList);
router.post("/addMap", controller.addMapList);
router.get("/rank", controller.getRankList);
router.post("/addRank", controller.addRankList);
router.get("/product", controller.getProductList);
router.post("/addProduct", controller.addProductList);
router.get("/stock", controller.getStockList);
router.post("/addStock", controller.addStockList);
router.get("/getChina", controller.getMapChina);
router.get("/getProvince", controller.getMapProvince);
router.post("/test",(ctx:any)=>{
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
})
module.exports = router;