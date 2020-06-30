const VERSION = "/v1";
const api: any = {
  login: VERSION + "/api/login",
  logout: VERSION + "/api/logout",
  getUserInfo: VERSION + "/api/user/info",
  upload: VERSION + "/api/upload",
  download: VERSION + "/api/download",
  nodeStart: VERSION + "/api/node/start",
  nodeStop: VERSION + "/api/node/stop",
  pledge: VERSION + "/api/pledge",
  minerList: VERSION + "/api/miner/list",
};

export default api;
