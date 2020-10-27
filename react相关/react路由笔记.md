####  认识react-router

1. router放置位置一般都在App.js中

2. 路由api简介

   1. Router

      1. 该api用于放置Route组件及其他组件

      2. ```react
      import {Router,Route} from "react-router-dom"
         //Router为路由嵌套容器，不写则Route将报错，并无法确定路径
      const App = ()=>{
             render(){
                 return(
                 	<div className="app">
                     	<Router>
                         	<Route path="/" component={Home}></Route>
                         </Router>
                  </div>
                 )
             }
         }
         ```
   
   2. HashRouter
   
      1. 锚点链接 整体路由将在域名后面加一个#
   
   3. BrowserRoueter
   
      1. H5新特性 / 相当于history.push 如果上线后，***需要后台做一些处理：重定向处理 404bug***
   
   4. Route
   
      1. 该api为路由组件对象
   
      2. ```react
         import Home from "./page/home"
         /**path为展现在实际线上的路径前面匹配对应的域名*/
         /**component为对应引入的Home组件*/
         //整体代表设置Home组件为一个路由组件，负责页面的某一个路径展现的样式
         <Route path="/" component={Home}></Route>
         ```
      ```
         
      ```
   
   5. exact
   
      1. 该api用于匹配路由精准度
   
      2. ```react
         /**
         *exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜*杠也是可以匹配上的。 如果在父路由中加了exact，是不能匹配子路由的,建议在*子路由中加exact
         */
         <Route exact path="/a" component={Home}></Route>
         <Route path="/a/b" component={About}></Route>
         // 现在的这种情况如果访问/a/b将访问到该路由
         //如果不加exact时，exact为false，访问/a/b将把/a和/a/b都显示出来
         
         ```
   
   6. strict
   
      1. 该api用于匹配理由斜杠
   
      2. ```react
         /**
         *strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的
         */
         <Route strict path="/a" component={Home}></Route>
         // 这种情况下访问路由/a/将会不再显示，意思是/a/是一个新的路由，而不是/a
         ```
   
   7. Switch
   
      1. 该api用于判断并只加载一个页面
   
      2. ```react
         /**
         * 这里的NotFound为404页面，属于以上路径都不正确时将显示该路径
         */
         
         <Switch>
         	<Route path="/" component={Home}></Route>
         	<Route component={NotFound}></Route>
         </Switch>
         
         //如果没有Switch为false时，访问/disja 这种不存在的路径时将显示空白
         //如果Switch为true时，访问/disja 这种不存在的路由将显示 最后这个无匹配规则的路径
         ```
   
   8. render
   
      1. 该api负责渲染组件
   
      2. ```react
         // 这种是比较简约的路由方式，不需要匹配对应的组件
         <Route path="/demo" render={()=> (<div>hello</div>)}></Route>
         // 还有一种加载组件的方式且可以传递props及一些参数
         import Home from "./page/home";
         <Route path="/demo" render={(props)=> (<Home {...props} name="你好" />)}></Route>
         
         ```
   
   9. Link
   
      1. 该api用于切换路由时的点击切换，等于a标签
   
      2. ```react
         <Link to="/a">a页面</Link>
         ```
   
         
   
   10. NavLink
   
       1. 该api将设置a标签上的class默认为active可以自定义选中样式、
   
       2. ```react
          <NavLink to="/a" >a页面</NavLink>
          //这里存在一个问题
          //如果此时多个nav，选中的每一个都会有active的class，解决方案如下
          // 加入exact属性，精准路由即可
          <NavLink exact to="/a" >a页面</NavLink>
          
          //同时NavLink有自己的属性
          1.activeClassName 这个属性用于修改默认添加的class名称
          2.activeStyle 这个属性可以自定义选中的样式，是在a标签上架style的方式
          
          
          ```
   
   11. URL params 路由传参
   
       1. ```react
          //实例1
          /**
          *这里的/:id表示路由为/a/123
          *此时的id为传递参数的key
          *此时的123将作为id的参数传入组件中的props.match.params中
          *如果此时不传这个/123将出现404的问题，解决方案为
          *<Route path="/a/:id？" component={Home}></Route>
          *在传递的参数后面加如？即可
          *同时可以传递多个参数的形式如
          *<Route path="/a/:id?/:name" component={Home}></Route>
          *此时组件中可以通过props.match.params.name来获取
          *同样需要加入？表示可选性
          */
          
          // Route路由
          <Route path="/a/:id" component={Home}></Route>
          //组件
          const Home = (props)=>{
              render(){
                  return(
                  	<div>
                      	hello {props.match.params.id}
                      </div>
                  )
              }
          }
          
          //实例2
          /**
          *1.这是第二种使用？传递参数
          *这里使用URLSearchParams这个对象来获取路由上的参数
          */
          // Route
          <Route path="/a?id=123" component={Home}></Route>
          // 组件
          const Home = (props)=>{
              const params = new URLSearchParams(props.location.search);
              console.log(params.get("id"))
              //log id:123
              render(){
                  return(
                  	<div>
                      	hello {props.match.params.id}
                      </div>
                  )
              }
          }
          /**
          *1.这是第二种使用？传递参数
          *这里使用querystring这个组件来获取路由上的参数
          *这里获取的value是{?id=123}
          *需要对key做一个处理
          */
          // Route
          <Route path="/a?id=123" component={Home}></Route>
          // 组件
          import querystring from "querystring";
          const Home = (props)=>{
              const value = querystring.parse(props.location.search)
              console.log(value.id)
              //log id:123
              render(){
                  return(
                  	<div>
                      	hello {props.match.params.id}
                      </div>
                  )
              }
          }
          
          //实例3
          
          ```
   
   12. Link中传递参数
   
       1. ```react
          <NavLink 
              to={{
                  pathname:"/a",
                  search:{name:"你好"}，
                  hash:"#the-hash",
                  state:{flag:"flag"} // 隐形传递
              }}
              ></NavLink>
          ```
   
   13. Redirect
   
       1. 重定向
   
       2. ```react
          <Redirect from="/b" to="/a" />
          // 此时如果访问/b将回到/a
          ```
   
   14. withRouter
   
       1. 用于处理不是路由的组件中使用路由属性，如push，repalce等
   
       2. ```react
          // 方式1
          
          import {withRouter} from "react-router-dom";
          class Demo extends React.Component{
              clickPush(){
                  //这里的props就可以拿到方法了
                  console.log(this.props);        
              }
          	render(){
                  return (
                  	<div>
                      	<button onClick={this.clickPush.bind(this)}>跳转</button>
                      </div>
                  )
              }
          }
          export default withRouter(Demo);
          
          //方式2
          // 在app.js 中传递 缺点：必须是app.js中传递的组件
          import Demo from "./Demo";
          
          export default class App extends React.Component{
              render(){
                  return (
                  	<div>
                			// 将值传递给子组件，在子组件中使用方法          
                      	<Demo {...props} />
                      </div>
                  )
              }
          }
   ```
          
       
   15. Prompt
   
       1. 用于某一些页面需要在某个绑定的条件成立后退出时提示用户是否离开
   
       2. ```react
          import {Prompt} from "react-router-dom";
          class Demo extends React.Component{
              constructor(){
                  this.state = {
                      name:""
                  }
              }
          	render(){
                  return (
                  	<div>
                      	<Prompt 
                           	when={ !!this.state.name }
                              message={"你确定要离开吗?"}
                           />
                          {this.state.name}
                      </div>
                  )
              }
          }
          ```
   
          

