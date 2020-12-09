#### 使用css-loader 和 style-loader插件进行css模块打包

```js
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
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
    mode:'development',
    plugins:{
        new htmlWebpackPlugin({
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
    },
    module:{
        // 定义规则
        rules:[{
            //匹配以.css结尾的文件
            test:/\.css$/,
            // 插件使用 注意加载顺序从右向左执行
            // 优先加载css-loader 最后加载style-loader
            use:["style-loader",'css-loader']
        }]
    }
}
```



#### 使用uglifyjs-webpack-plugin 和 optimize-css-assets-webpack-plugin 进行独立打包、压缩

```js
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
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
    mode:'development',
    plugins:{
        new htmlWebpackPlugin({
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
        }),
        // 进行单独打包
        new MiniCSSExtractPlugin({
            filename:"[name].js",
            chunksFilename:"[id].css"
        })
    },
    optimization:{
      minimizer:[
          // 用于压缩css文件
          new UglifyJsWebpackPlugin({
              // 是否开启缓存css文件
              cache:true,
              //是否使用多进程并行运行来提高构建速度
              parallel:true,
              // 是否开启map文件方式引入
              sourceMap:true
          }),
          //优化css压缩
          new OptimizeCSSAssetsWebpackPlugin({})
      ]  
    },
    module:{
        // 定义规则
        rules:[{
            //匹配以.css结尾的文件
            test:/\.css$/,
            // 插件使用 注意加载顺序从右向左执行
            // 优先加载css-loader 最后加载style-loader
            use:[MiniCSSExtractPlugin.loader,'css-loader']
        }]
    }
}
```

