let consoleMinY = 0;
let consoleMaxY = 0;
let consoleYRange = null;

const LocalStorage = {
  localStorage: function () {
    return storages.create("xxxxjk23232");
  },
  getLastTimeKeyword: function (timeLimit) {
    let uniqueId = timeLimit; //简单的让次数作为唯一次数
    let localStorage = this.localStorage();
    if (uniqueId == localStorage.get("lastTimeKeyword_timelimit", -1)) {
      return localStorage.get("lastTimeKeyword");
    }
  },
  setThisTimeKeyword: function (keyword, timeLimit) {
    let localStorage = this.localStorage();
    localStorage.put("lastTimeKeyword", keyword);
    localStorage.put("lastTimeKeyword_timelimit", timeLimit);
  },
  setConsoleMinY: function (y) {
    if (consoleMinY == 0) {
      if (y) {
        log("设置控制台最小高度 %s", y);
        let localStorage = this.localStorage();
        localStorage.put("consoleMinY", y);
        hasSetConsoleMinY = true;
      }
    }
  },
  //会设置最小的那个
  setConsoleMaxY: function (y) {
    if (consoleMaxY == 0) {
      if (y) {
        log("设置控制台最大高度 %s", y);
        let localStorage = this.localStorage();
        localStorage.put("consoleMaxY", y);
        hasSetConsoleMaxY = true;
      }
    } else {
      if (y < consoleMaxY) {
        consoleMaxY = 0;
        this.setConsoleMaxY(y);
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
