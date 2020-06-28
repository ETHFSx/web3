<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="app-aside">
        <ul class="slidebar-ul">
          <li class="slidebar-li">
            <router-link to="/user"
              ><i class="el-icon-monitor"></i> <span>Wallet</span></router-link
            >
          </li>
          <li class="slidebar-li">
            <router-link to="/upload"
              ><i class="el-icon-upload"></i> <span>Upload</span></router-link
            >
          </li>
          <li class="slidebar-li">
            <router-link to="/download"
              ><i class="el-icon-download"> </i
              ><span>Download</span></router-link
            >
          </li>
          <li class="slidebar-li">
            <router-link to="/profit"
              ><i class="el-icon-money"> </i><span>Profit</span></router-link
            >
          </li>
          <li class="slidebar-li">
            <router-link to="/config"
              ><i class="el-icon-money"> </i><span>Config</span></router-link
            >
          </li>
        </ul>
      </el-aside>
      <el-main class="mian-wrap">
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
/* CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
p,
div {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.app-aside {
  min-height: 100vh;
  background-color: #a1afc9;
  .slidebar-ul {
    padding: 0;
    .slidebar-li {
      list-style: none;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      [class^="el-icon"] {
        margin-right: 10px;
      }
      a {
        padding-left: 30px;
        text-decoration: none;
        color: #fff;
      }
    }
  }
}
.mian-wrap {
  border: 1px solid rgba(0, 0, 0, 0.1);
  .main {
    margin: 0 auto;

    .ipfs-msg {
      font-family: "Montserrat", "Verdana", system-ui, sans-serif;
      margin: 20px 0;
      font-size: 30px;
    }
    .upload-pannel {
      .el-upload-dragger {
        width: 600px;
        .el-icon-unlock {
          font-size: 67px;
          color: #c0c4cc;
          margin: 40px 0 16px;
          line-height: 50px;
        }
      }
    }
    .option-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px auto;
      border-bottom: solid 1px;
      border-color: #ebeef5;
      padding-bottom: 10px;
      .option-title {
        display: inline-block;
        width: 120px;
        text-align: left;
      }
      .option-item-input {
        display: flex;
        justify-content: space-between;
        flex: 1;
        &.column {
          flex-direction: column;
        }
        .el-input {
          margin-right: 10px;
          input {
            width: 180px;
          }
        }
      }
      .meta {
        min-width: 100%;
        display: inline-block;
        color: white;
        padding: 2px 4px;
        font-size: 14px;
        background: #a1afc9;
        margin: 2px 0;
      }
    }
  }
}
.fl {
  float: left;
}
</style>
