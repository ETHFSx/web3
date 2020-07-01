import axios from "@/assets/http/axios";
import API from "@/assets/http/api";
const JSONRPC = "2.0";
const ID = 1;

class HttpClass {
  static login(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.login,
      params: params,
      id: ID,
    });
  }

  static logout(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.logout,
      params: params,
      id: ID,
    });
  }

  static getUserInfo(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.getUserInfo,
      params: params,
      id: ID,
    });
  }

  static upload(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.upload,
      params: params,
      id: ID,
    });
  }

  static download(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.download,
      params: params,
      id: ID,
    });
  }

  static nodeStart(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.nodeStart,
      params: params,
      id: ID,
    });
  }

  static nodeStop(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.nodeStop,
      params: params,
      id: ID,
    });
  }

  static pledge(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.pledge,
      params: params,
      id: ID,
    });
  }

  static minerList(...params: Array<any>) {
    return axios.post(API.HOST, {
      jsonrpc: JSONRPC,
      method: API.minerList,
      params: params,
      id: ID,
    });
  }
}

export default HttpClass;
