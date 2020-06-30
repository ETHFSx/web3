const { remote } = window.require("electron");
import uuid from "node-uuid";

class UploadFiles {
  fileDB: any;

  constructor() {
    this.fileDB = remote.getGlobal("FileDB");
  }

  async addUploadFile({ hash = "", name = "" }) {
    let id = uuid.v1();
    let list = await this.fileDB.getData("[upload_list]", []);
    list.unshift(id);
    await this.fileDB.updateData("[upload_list]", list);

    let info = {
      id,
      hash: "",
      name,
      time: new Date().getTime(),
      status: 0,
    };

    // update upload_file_info
    await this.fileDB.updateData(`[upload_file_info]${id}`, info);
    return info;
  }

  async updateUploadFile(id: string, info: any) {
    await this.fileDB.updateData(`[upload_file_info]${id}`, info);
  }

  async delUploadFileById(id: string) {
    let list = await this.fileDB.getData("[upload_list]", []);
    let _index = list.indexOf(id);
    list.splice(_index, 1);
    await this.fileDB.updateData("[upload_list]", list);
    await this.fileDB.del(`[upload_file_info]${id}`);
  }

  async getUploadList() {
    let list = await this.fileDB.getData("[upload_list]", []);
    let arr = [];
    for (let value of list) {
      let info = await this.fileDB.getData(`[upload_file_info]${value}`, null);
      if (!info) continue;
      arr.push(info);
    }
    console.log(arr);
    return arr;
  }
}

export default UploadFiles;
