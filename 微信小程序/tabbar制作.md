#### tabbar自定义问题总结

点击导航栏跳转时，导航栏状态未改变

解决办法

```js
//在每一个导航页中的onshow中添加一段代码
onShow(){
    if(typeof this.getTabBar && this.getgetTabBar()){
        // 这里去拿到tab的实例，然后根据对应页在导航栏中的下标位置设置状态
        this.getTabBar().setData({
            selected:1
        })
    }
}
```

