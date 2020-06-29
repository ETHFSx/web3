const { remote } = window.require("electron");
import uuid from "node-uuid";

class DownloadFiles {
  fileDB: any;

  constructor() {
    this.fileDB = remote.getGlobal("FileDB");
  }

  async addDownloadFile({ hash = "", name = "" }) {
    let id = uuid.v1();
    let list = await this.fileDB.getData("[download_list]", []);
    list.unshift(id);
    await this.fileDB.updateData("[download_list]", list);

    // update upload_file_info
    await this.fileDB.updateData(`[download_file_info]${id}`, {
      id,
      hash,
      name,
      time: new Date().getTime(),
      status: 0,
    });
  }

  async delDownloadFileById(id: string) {
    let list = await this.fileDB.getData("[download_list]", []);
    let _index = list.indexOf(id);
    list.splice(_index, 1);
    await this.fileDB.updateData("[download_list]", list);
    await this.fileDB.del(`[download_file_info]${id}`);
  }

  async getDownloadList() {
    let list = await this.fileDB.getData("[download_list]", []);
    let arr = [];
    for (let value of list) {
      let info = await this.fileDB.getData(
        `[download_file_info]${value}`,
        null
      );
      if (!info) continue;
      arr.push(info);
    }
    console.log(arr);
    return arr;
  }
}

export default DownloadFiles;
