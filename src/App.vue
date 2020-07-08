<template>
  <div id="app">
    <el-container>
      <el-aside width="80px" class="app-aside" v-show="loginState === 1">
        <ul class="slidebar-ul">
          <li class="slidebar-li">
            <router-link to="/wallet" title="Wallet" active-class="active-nav"
              ><i class="el-icon-monitor"></i
            ></router-link>
          </li>
          <li class="slidebar-li">
            <router-link to="/upload" title="Upload" active-class="active-nav"
              ><i class="el-icon-upload"></i
            ></router-link>
          </li>
          <li class="slidebar-li">
            <router-link
              to="/download"
              title="Download"
              active-class="active-nav"
              ><i class="el-icon-download"> </i
            ></router-link>
          </li>
          <li class="slidebar-li">
            <router-link to="/miner" title="Miner" active-class="active-nav"
              ><i class="el-icon-money"> </i
            ></router-link>
          </li>
          <!-- <li class="slidebar-li">
            <router-link to="/config"
              ><i class="el-icon-money"> </i><span>Config</span></router-link
            >
          </li> -->
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

<script>
export default {
  computed: {
    loginState() {
      return this.$store.state.loginState;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
/* CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track-piece {
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: #edeff4;
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  /* background-color: rgba(125, 125, 125, 0.7); */
  background-color: #909090;
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  /* background-color: rgba(125, 125, 125, 0.7); */
  background-color: #909090;
  -webkit-border-radius: 6px;
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
.el-container {
  height: 100%;
}
.app-aside {
  min-height: 100vh;
  background-color: #333333;

  .slidebar-ul {
    padding-top: 20px;

    .slidebar-li {
      list-style: none;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      [class^="el-icon"] {
        font-size: 26px;
      }
      a {
        margin: 0 auto;
        text-decoration: none;
        color: #fff;
        width: 100%;
        height: 100%;
        display: inline-block;
        padding-top: 12px;
        transition: all 0.2s ease;

        &.active-nav {
          background: #555555;
        }
      }
    }
  }
}
.mian-wrap {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;

  .main {
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;

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
      margin: 0px auto 20px;
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
