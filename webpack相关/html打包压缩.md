### 使用插件 html-webpack-plugin插件

```js
const path = require("path")
const htmlWebpackplugin = require("html-webpack-plugin")
module.exports = {
    //导入的路径
    entry:{
        index:"./src/js/index.js"
    },
    output:{
        // name对应entry中的key
        filename:"[name].js",
        // 导出路径
        path:path.resolve(__dirname,'../out')
    },
    //运行环境 需要压缩时去除
    mode:'development',
    plugins:{
        new htmlWebpackplugin({
        	// 导出的路径
            filename:"./cn/index.html",
        	// 导入的路径
            template:"./src/index.html",
        	// 打包前放入模板html中的js文件
            chunks:["index"],
            minify:{
    			//去除空格
                 collapseWhitespace:true,
                 // 去除注释
    			removeComments:true
            }
        })
    }
}
```

