import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/wallet",
    name: "wallet",
    component: () =>
      import(/* webpackChunkName: "wallet" */ "../views/Wallet.vue"),
  },
  {
    path: "/upload",
    name: "upload",
    component: () =>
      import(/* webpackChunkName: "upload" */ "../views/Upload.vue"),
  },
  {
    path: "/download",
    name: "download",
    component: () =>
      import(/* webpackChunkName: "download" */ "../views/Download.vue"),
  },
  {
    path: "/miner",
    name: "miner",
    component: () =>
      import(/* webpackChunkName: "profit" */ "../views/Miner.vue"),
  },
  {
    path: "/config",
    name: "config",
    component: () =>
      import(/* webpackChunkName: "config" */ "../views/Config.vue"),
  },
  {
    path: "*",
    name: "wallet",
    component: () =>
      import(/* webpackChunkName: "config" */ "../views/Wallet.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
