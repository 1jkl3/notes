const { sellerModel, trendModel, mapModel, rankModel, productModel, stockModel } = require("../model/index");
const {response,Info} = require("../util/response");
console.log(Info);
class wsContr{
    public async getSellerList(): Promise<Error | void> {
        try {
            let res = await sellerModel.find();
            response.setData(res);
            return response;
        } catch (err) {
            response.setCode(500);
            response.setData(err.message);
            return response;
        }
    }
}

export = new wsContr();
