import {
  createRouter,
  createWebHistory
} from "vue-router";
const routes = [{
    path: "/",
    name: "Home",
    component: () => import("/@/pages/Home.vue"),
  },
  {
    path: "/trend",
    name: "trendPage",
    component: () => import("/@/pages/TrendPage.vue")
  },
  {
    path: "/map",
    name: "mapPage",
    component: () => import("/@/pages/MapPage.vue")
  },
  {
    path: "/rank",
    name: "rankPage",
    component: () => import("/@/pages/RankPage.vue")
  },
  {
    path: "/product",
    name: "productPage",
    component: () => import("/@/pages/ProductPage.vue")
  },
  {
    path: "/stock",
    name: "stockPage",
    component: () => import("/@/pages/StockPage.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});