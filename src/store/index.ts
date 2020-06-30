import Vue from "vue";
import Vuex from "vuex";
import http from "@/assets/http/http";
import API from "@/assets/http/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginState: 0,
    password: "",
    userInfo: null,
  },
  mutations: {
    SET_LOGIN_STATE(state, value) {
      state.loginState = value;
    },
    SET_PASSWORD(state, value) {
      state.password = value;
    },
    SET_USER_INFO(state, value) {
      state.userInfo = value;
    },
  },
  actions: {
    getUserInfo({ state, commit }) {
      http
        .get(API.getUserInfo, {
          params: {
            Password: state.password,
          },
        })
        .then((res) => {
          if (res.Error === 0) {
            commit("SET_USER_INFO", res.Result);
          }
        });
    },
  },
  modules: {},
});
