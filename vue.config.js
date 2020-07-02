module.exports = {
  devServer: {
    host: "127.0.0.1",
    port: 2333,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:6000",
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.application.ethfx",
        productName: "web3",
        artifactName: "${productName}_${version}.${ext}",
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
        },
        extraFiles: [
          {
            from: "resources/${os}",
            to: "Resources/bin",
            filter: ["**/*"],
          },
        ],
      },
    },
  },
};
