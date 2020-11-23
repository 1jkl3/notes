const Koa = require("koa");
const app = new Koa();
const statics = require("koa-static");
const error = require("koa-onerror");
const path = require("path");
const db = require("./db");
const socketInit = require("./service/websocket_Event");
// 首页api路由
const Index = require("./router/index");

// 异常中间件
error(app);

// 配置post请求传回参数
app.use(require("koa-body")({
    multipart: true
}));

// 配置静态资源文件
app.use(statics(path.join(__dirname, "/public")));

// 视图资源
app.use(statics(path.join(__dirname, "/views")));

// 配置logger日志
app.use(require("koa-logger")());

// 配置响应数据json化
app.use(require("koa-json")());

// 配置路由添加
app.use(Index.routes(), Index.allowedMethods());

// 监听异常
app.on("error", (err: string, ctx: object) => {
    console.error("server error", err, ctx);
});

module.exports = app;