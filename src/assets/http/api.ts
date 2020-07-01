const VERSION = "/v1";
const api: any = {
  HOST: "http://127.0.0.1:6000",
  login: "login",
  logout: "quit",
  getUserInfo: "/api/user/info",
  upload: "upload",
  download: "download",
  nodeStart: "/api/node/start",
  nodeStop: "/api/node/stop",
  pledge: "pledge",
  minerList: "/api/miner/list",
};

export default api;
