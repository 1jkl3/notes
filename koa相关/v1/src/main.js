import { createApp,h } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from './store/index';
import { plugin } from 'echarts-for-vue';
import "./index.css";
const app = createApp(App);
app.use(plugin, { echarts, h }); 
app.use(router);
app.use(store);
app.mount("#app");
