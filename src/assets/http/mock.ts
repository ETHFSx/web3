import Mock from "mockjs";

Mock.mock(/\/api\/upload/, "get", (res: any) => {
  return {
    test: "test",
  };
});

Mock.mock(/\/api\/download\/info/, "get", (res: any) => {
  return {
    name: `${new Date().getTime()}.exe`,
  };
});
