const WS = require("ws");
const controllers = require("../controller/wsContr");
/**
 * action 状态值 参数内容
 *        data ：：数据内容
 *        fullScreen ：：放大缩小状态
 *        themeChange ：：主题切换
 * socketType:放回的数据类型 哪个图表的数据 或者放大缩小及主题切换的数据
 *          trend
 *          seller
 *          map
 *          rank
 *          stock
 *          product
 *          fullScreen
 *          theme
 * chartName 相当于api 接口名称
 * value 具体的数据值
 *      如果是全屏时，true 放大 false 缩小
 *      主题切换时，chalk或者 vintage 两种主题名称
 * data action为data时额外的参数
 */
interface messageInfo {
    action: string
    socketType: string
    chartName?: string | null
    value?: boolean | string | null
    data?: Object
}

const dataInfo:any = {
    seller:controllers.getSellerList,
    trend:controllers.getTrendInfo,
    maps:controllers.getMapList,
    rank:controllers.getRankList,
    product:controllers.getProductList,
    stock:controllers.getStockList
}

class ServerSocket {
    static instance: ServerSocket = null;
    socket: any = null;
    static get getInstance() {
        if (!this.instance) {
            this.instance = new ServerSocket();
        }
        return this.instance;
    }
    constructor() {
        this.createSocket();
    }
    public createSocket() {
        this.socket = new WS.Server({
            port: 9998
        })
        this.listen();
    }
    public listen() {
        console.log("socket 创建成功！");
        this.socket.on("connection", (client: any) => {
            console.log("socket 连接成功！");
            client.on("message", (msg: string) => {
                const payload: messageInfo = JSON.parse(msg);
                if (payload.action === "data") {
                    this.getData(payload, client)
                } else {
                    this.socket.clients.forEach((item: any) => {
                        item.send(payload)
                    })
                }
            })
            client.on("disconnect", (err: string) => {
                console.log("断开连接");
                // console.log(err);
            })
        })
    }

    private async getData(data: messageInfo, client: any) {
        let info = await dataInfo[data.chartName]()
        client.send(JSON.stringify(info));
    }
}

export default ServerSocket.getInstance;