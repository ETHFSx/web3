import Mock from "mockjs";

Mock.mock(/\/v1\/api\/login/, "post", (res: any) => {
  return {
    Error: 0,
    Result: null,
  };
});

Mock.mock(/\/v1\/api\/logout/, "post", (res: any) => {
  return {
    Error: 0,
    Result: null,
  };
});

Mock.mock(/\/v1\/api\/user\/info/, "get", (res: any) => {
  return {
    Error: 0,
    Result: {
      Address: "AFHAH2JANVJAKSD12NJKVASD",
      Balance: 39411974,
      Assets: "ETH",
      Pledge: 113123,
      NodeState: 1, // 0  关闭 ;1 开启
    },
  };
});

Mock.mock(/\/v1\/api\/upload/, "post", (res: any) => {
  return {
    Error: 0,
    Result: {
      Hash: new Date().getTime(),
    },
  };
});

Mock.mock(/\/v1\/api\/download/, "post", (res: any) => {
  return {
    Error: 0,
    Result: {
      Name: `${new Date().getTime()}.exe`,
    },
  };
});

Mock.mock(/\/v1\/api\/node\/start/, "post", (res: any) => {
  return {
    Error: 0,
    Result: null,
  };
});

Mock.mock(/\/v1\/api\/node\/stop/, "post", (res: any) => {
  return {
    Error: 0,
    Result: null,
  };
});

Mock.mock(/\/v1\/api\/miner\/list/, "get", (res: any) => {
  return {
    Error: 0,
    Result: [
      {
        Name: "weixin.exe", // 文件名称
        Hash: "AB11771BCD8678A76C86D", // 文件Hash
        Profit: 3111, // 挖矿收益
      },
      {
        Name: "weixin.exe", // 文件名称
        Hash: "AB11771BCD8678A76C86D", // 文件Hash
        Profit: 3111, // 挖矿收益
      },
    ],
  };
});
