import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "@/assets/http/http";
// import "@/assets/http/mock";
// import API from "@/assets/http/api";
import UploadFiles from "@/entity/uploadFiles";
import DownloadFiles from "@/entity/downloadFiles";

Vue.config.productionTip = false;
Vue.prototype.$http = http;
// Vue.prototype.$api = API;
Vue.prototype.uploadFiles = new UploadFiles();
Vue.prototype.downloadFiles = new DownloadFiles();

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
