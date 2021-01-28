// 本地环境是否需要使用cdn
const devNeedCdn = false
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios'
    },
    // cdn的css链接
    css: [
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.prod.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0-rc.1/vuex.global.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.8/vue-router.esm.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js'
    ]
}
module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            console.log(args);
            return args
        })
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals;
    }
}