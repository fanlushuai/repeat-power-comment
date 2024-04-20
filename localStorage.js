let hasSetConsoleMinY = false;
let hasSetConsoleMaxY = false;
let consoleYRange = null;

const LocalStorage = {
  localStorage: function () {
    return storages.create("xxxxjk23232");
  },
  setConsoleMinY: function (y) {
    if (!hasSetConsoleMinY) {
      if (y) {
        log("设置控制台最小高度 %s", y);
        let localStorage = this.localStorage();
        localStorage.put("consoleMinY", y);
        hasSetConsoleMinY = true;
      }
    }
  },
  setConsoleMaxY: function (y) {
    if (!hasSetConsoleMaxY) {
      if (y) {
        log("设置控制台最大高度 %s", y);
        let localStorage = this.localStorage();
        localStorage.put("consoleMaxY", y);
        hasSetConsoleMaxY = true;
      }
    }
  },
  getConsoleYRange: function () {
    if (!consoleYRange) {
      let localStorage = this.localStorage();
      let consoleMaxY = localStorage.get("consoleMaxY");
      if (consoleMaxY) {
        let consoleMinY = localStorage.get("consoleMinY");
        if (consoleMinY) {
          consoleYRange = { minY: consoleMinY, maxY: consoleMaxY };
          return consoleYRange;
        }
      }
    } else {
      return consoleYRange;
    }
  },
};

module.exports = { LocalStorage };
