import BaseDB from "./base.js";
class FileDB extends BaseDB {
  constructor(subDirname) {
    super("File", subDirname);
    this.startDB();
    this.keyLists = {};
  }

  async initDB(callback) {
    const vm = this;
    this.keyLists = {};
    this.db
      .createKeyStream()
      .on("data", (key) => {
        vm.keyLists[key.toString()] = true;
      })
      .on("end", () => {
        callback && callback();
      });
  }

  async getData(key, initVal = []) {
    const vm = this;
    if (this.keyLists[key]) {
      return this.queryData(key);
    } else {
      this.updateData(key, initVal);
      vm.keyLists[key.toString()] = true;
      return initVal;
    }
  }

  async updateData(key, value) {
    this.keyLists[key.toString()] = true;
    return this._updateData(key, value);
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      if (this.keyLists[key]) {
        this.db.del(key, (error) => {
          delete this.keyLists[key];
          resolve({ error: error });
        });
      } else {
        resolve({ error: 0 });
      }
    });
  }

  async getKeyStartWith(patch) {
    const vm = this;
    return new Promise((resolve, reject) => {
      let arr = [];
      for (let key in vm.keyLists) {
        if (key.startsWith(patch)) {
          arr.push(key);
        }
      }
      resolve({ error: 0, result: arr });
    }).catch((e) => {
      return { error: 40000, result: e };
    });
  }

  async isExists(key) {
    return Boolean(this.keyLists[key]);
  }
}
export default FileDB;
