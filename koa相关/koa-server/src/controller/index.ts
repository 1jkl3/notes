// charts图表数据接口类
const { sellerModel, trendModel, mapModel, rankModel, productModel, stockModel } = require("../model/index");
const response = require("../util/response");
const fs = require("fs");
const paths = require("path")
class Charts {
    constructor() {
        // 注册绑定
        this.getSellerList.bind(this);
        this.addSeller.bind(this);
        this.getTrendInfo.bind(this);
        this.addTrendInfo.bind(this);
        this.getMapList.bind(this);
        this.addMapList.bind(this);
    }
    /**
     * 获取商城销售列表
     */
    public async getSellerList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await sellerModel.find();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 添加商城销售列表
     */
    public async addSeller(ctx: any, next: Function): Promise<Error | void> {
        try {
            let { name, value } = await ctx.request.body;
            let Instance = new sellerModel({ name, value });
            let res = await Instance.save();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取商家销售趋势
     */
    public async getTrendInfo(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await trendModel.find();
            response.setData(res[0]);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 添加商家销售趋势
     */
    public async addTrendInfo(ctx: any, next: Function): Promise<Error | void> {
        try {
            let data = ctx.request.body;
            data.map = JSON.parse(data.map)
            data.seller = JSON.parse(data.seller)
            data.commodity = JSON.parse(data.commodity)
            data.common = JSON.parse(data.common)
            data.type = JSON.parse(data.type)
            let Instance = new trendModel(data);
            let res = await Instance.save();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取商家地图列表
     */
    public async getMapList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await mapModel.find();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取商家地图列表
     */
    public async addMapList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let data = ctx.request.body;
            data.children = JSON.parse(data.children);
            console.log(data);
            let Instance = new mapModel(data);
            let res = await Instance.save();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取商家销售排行列表
     */
    public async getRankList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await rankModel.find();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 添加商家销售排行列表
     */
    public async addRankList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let data = ctx.request.body;
            let Instance = new rankModel(data);
            let res = await Instance.save();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取热销商品占比列表
     */
    public async getProductList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await productModel.find();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 添加热销商品占比列表
     */
    public async addProductList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let data = ctx.request.body;
            console.log(data.children);
            let info =[
                {
                    "name": "q装",
                    "value": 1320,
                    "children": [
                        { "name": "qa装", "value": 13301 },
                        { "name": "qb装", "value": 13401 },
                        { "name": "qc装", "value": 13501 },
                    ]
                },
                {
                    "name": "w装",
                    "value": 1320,
                    "children": [
                        { "name": "wa装", "value": 13601 },
                        { "name": "qb装", "value": 13701 },
                        { "name": "wc装", "value": 13801 },
                    ]
                },
                {
                    "name": "e装",
                    "value": 1340,
                    "children": [
                        { "name": "ea装", "value": 13101 },
                        { "name": "eb装", "value": 13201 },
                        { "name": "ec装", "value": 13301 },
                    ]
                },
                {
                    "name": "r装",
                    "value": 1350,
                    "children": [
                        { "name": "ra装", "value": 13311 },
                        { "name": "rb装", "value": 13421 },
                        { "name": "rc装", "value": 13531 },
                    ]
                },
                {
                    "name": "t装",
                    "value": 1330,
                    "children": [
                        { "name": "ta装", "value": 13301 },
                        { "name": "tb装", "value": 13441 },
                        { "name": "tc装", "value": 13511 },
                    ]
                },
            ]
            data.children = info
            console.log(data);
            let Instance = new productModel(data);
            let res = await Instance.save();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 获取商家库存销量列表
     */
    public async getStockList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await stockModel.find();
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 添加商家库存销量列表
     */
    public async addStockList(ctx: any, next: Function): Promise<Error | void> {
        try {
            let data = ctx.request.body;
            console.log(data);
            let Instance = new stockModel(data);
            let res = await Instance.save();
            response.setCode(200);
            response.setData(res);
            ctx.body = response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 
     * @param ctx 获取中国地图
     * @param next 
     */
    public async getMapChina(ctx: any, next: Function): Promise<Error | void> {
        try {
            let res = await fs.createReadStream(paths.join(__dirname, "../public/json/china.json"));
            response.setCode(200);
            response.setData(res);
            ctx.body = res;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
    /**
     * 
     * @param ctx 获取中国省份地图
     * @param next 
     */
    public async getMapProvince(ctx: any, next: Function): Promise<Error | void> {
        try {
            let { id } = ctx.request.query;
            let res = await fs.createReadStream(paths.join(__dirname, `../public/json/province/${id}.json`));
            response.setCode(200);
            response.setData(res);
            ctx.body = res;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            ctx.body = response;
        }
    }
}
export = new Charts();