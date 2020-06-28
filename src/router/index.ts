import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
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
    path: "/profit",
    name: "profit",
    component: () =>
      import(/* webpackChunkName: "profit" */ "../views/Profit.vue"),
  },
  {
    path: "/config",
    name: "config",
    component: () =>
      import(/* webpackChunkName: "config" */ "../views/Config.vue"),
  },
  {
    path: "*",
    redirect: "/user",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
