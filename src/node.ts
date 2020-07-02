import { platform } from "os";
import { app, ipcMain } from "electron";
const path = require("path");
const cp = require("child_process");
const appRoot = require("app-root-dir").get();
const getPlatform = () => {
  switch (platform()) {
    case "aix":
    case "freebsd":
    case "linux":
    case "openbsd":
    case "android":
      return "linux";
    case "darwin":
    case "sunos":
      return "mac";
    case "win32":
      return "win";
  }
};

// const runIpfsDamon: any = async () => {
//   let cmdStr: string = "";
//   let runDaemonCmd: any = null;
//   const resourcesPath =
//     process.env.NODE_ENV === "production"
//       ? path.join(path.dirname(appRoot), "resources", "bin")
//       : path.join(appRoot, "resources", getPlatform());

//   if (getPlatform() === "win") {
//     cmdStr = `.\\ipfs.exe`;
//   } else {
//     cmdStr = "./ipfs";
//   }

//   // initialize ipfs conifg if not exists
//   cp.spawn("./ipfs", ["init"], {
//     cwd: resourcesPath,
//   });

//   runDaemonCmd = cp.spawn(cmdStr, [], {
//     cwd: resourcesPath,
//   });

//   app.on("will-quit", () => {
//     try {
//       process.kill(-runDaemonCmd.pid);
//     } catch (error) {
//       console.log("ipfs had already exit.");
//     }
//   });
//   runDaemonCmd.stdout.on("data", (data: any) => {
//     console.log(`stdout is: ${data}`);
//   });

//   runDaemonCmd.stderr.on("data", (error: any) => {
//     console.log("daemon error!");
//     console.log(error.toString());
//     console.error(`stderr: ${error.toString()}`);
//   });

//   runDaemonCmd.on("close", (code: any) => {
//     console.log(`子进程退出，退出码 ${code}`);
//   });
// };

const runEthfsDamon: any = async (createWindow: any) => {
  let cmdStr: string = "";
  let runDaemonCmd: any = null;
  const resourcesPath =
    process.env.NODE_ENV === "production"
      ? path.join(path.dirname(appRoot), "resources", "bin")
      : path.join(appRoot, "resources", getPlatform());

  if (getPlatform() === "win") {
    cmdStr = `.\\ethfs.exe`;
  } else {
    cmdStr = "./ethfs";
  }

  console.log(cmdStr);
  console.log(resourcesPath);

  // run eth
  runDaemonCmd = cp.spawn(cmdStr, [], {
    cwd: resourcesPath,
  });

  app.on("will-quit", () => {
    try {
      console.log("app will quit");
      process.kill(runDaemonCmd.pid);
    } catch (error) {
      console.log("eth:eth had already exit.");
    }
  });
  runDaemonCmd.stdout.on("data", (data: any) => {
    console.log(`eth:stdout is: ${data}`);
    if (data.toString().indexOf("API server listening on") >= 0) {
      console.log("eth:createWindow!!!");
      // createWindow();
      bindEvent();
    }
  });

  runDaemonCmd.stderr.on("data", (error: any) => {
    console.log("eth:daemon error!");
    console.log(error.toString());
    console.error(`eth:stderr: ${error.toString()}`);
  });

  runDaemonCmd.on("close", (code: any) => {
    console.log(`eth:子进程退出，退出码 ${code}`);
  });

  function bindEvent() {
    ipcMain.on("startIpfs", async (event, params) => {
      let startCmd = cp.spawn(cmdStr, ["start", `--Password="${params}"`], {
        cwd: resourcesPath,
      });
      startCmd.stdout.on("data", (data: any) => {
        console.log(`start eth stdout: ${data}`);
      });
      startCmd.stderr.on("data", (data: any) => {
        console.log(`start eth stderr is: ${data}`);
      });

      startCmd.on("close", (code: any) => {
        console.log(`close ${code}`);
      });
      event.returnValue = "startIpfs";
    });

    ipcMain.on("stopIpfs", async (event) => {
      let stopCmd = cp.spawn(cmdStr, ["stop"], {
        cwd: resourcesPath,
      });

      stopCmd.stdout.on("data", (data: any) => {
        console.log(`start eth stdout: ${data}`);
      });
      stopCmd.stderr.on("data", (data: any) => {
        console.log(`start eth stderr is: ${data}`);
      });

      stopCmd.on("close", (code: any) => {
        console.log(`close ${code}`);
      });

      event.returnValue = "stopIpfs";
    });
  }
};

export { runEthfsDamon };
