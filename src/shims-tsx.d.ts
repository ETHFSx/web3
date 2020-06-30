import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "mockjs";

import * as axios from "axios";
declare module "axios" {
  export interface AxiosInstance {
    CancelToken: any;
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig & { useCache: boolean }
    ): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }

  // https://github.com/axios/axios/issues/1510
  export interface AxiosResponse<T> {
    Result?: any;
    Error?: any;
  }
}
