const { AutojsUtil } = require("./autojsUtil");
const { LocalStorage } = require("./localStorage");

const Config = {
  keywords: "",
  commentCountLimit: 20,
  uiComponent: null,
  // 一段时间的评论量
  // 一段时间的评论是否相同。穿插其他评论。
  getUiComponent: function () {
    if (uiComponent != null) {
      return uiComponent;
    }

    let uiComponent = AutojsUtil.getUiComponentByXml('./ui.xml')
    return uiComponent;
  },
  getStorage: function () {
    return LocalStorage.localStorage();
  },
  setLSConfig2UI: function () {
    log("LS->UI");

    let configStorage = this.getStorage();

    // todo 获取页面内的所有id,input text, input number,checkedbox,switch,。动态的，从页面里面，生成。参数的加载，和保存。

    let uiComponent = this.getUiComponent();
    let textIds = uiComponent.textIds.concat(uiComponent.numberIds);

    let checkIds = uiComponent.checkIds;

    const regex = /id/gi;
    for (let id of textIds) {
      let codeTemplate =
        'let cf = configStorage.get("id") if (cf) { ui.id.setText(cf+"") }';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }
    for (let id of checkIds) {
      let codeTemplate =
        'let cf = configStorage.get("id") ;if(cf!=null){ui.id.setChecked(cf)} ';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }
  },
  setUI2LSConfig: function () {
    log("UI->LS");

    let configStorage = this.getStorage();

    // 文本内容设置
    let uiComponent = this.getUiComponent();

    let numberIds = uiComponent.numberIds;
    let textIds = uiComponent.textIds;
    let checkIds = uiComponent.checkIds

    const regex = /id/gi;

    for (let id of numberIds) {
      let codeTemplate =
        'let id = ui.id.getText() if (id && id != "") { configStorage.put("id", parseInt(id)) ;Config.id = parseInt(id) }';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }

    for (let id of textIds) {
      let codeTemplate =
        'let id = ui.id.getText() if (id) { configStorage.put("id", id+"") ;Config.id = id+"" }';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }

    for (let id of checkIds) {
      let codeTemplate =
        'let id = ui.id.isChecked(); if(id!=null){configStorage.put("id", id) ;Config.id = id }';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }
  },
  loadConfig: function () {
    log("配置 本地->内存");

    let configStorage = this.getStorage();

    let uiComponent = this.getUiComponent();

    let ids = uiComponent.checkIds.concat(uiComponent.textIds).concat(uiComponent.numberIds);

    const regex = /id/gi;

    for (let id of ids) {
      let codeTemplate =
        'let id = configStorage.get("id"); this.id = id; log("id %s",id)';
      let oneParm = codeTemplate.replace(regex, id);
      // log(oneParm)
      eval(oneParm);
    }

    log(Config)
  },
};
module.exports = { Config };
