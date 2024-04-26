
const LocalStorage = {
  localStorage: function () {
    return storages.create("xxxxjk23232");
  },
  appStorage: function (apkName) {
    return storages.create(apkName);
  },
  getLastTimeKeyword: function (appName, timeLimit) {
    let uniqueId = timeLimit; //简单的让次数作为唯一次数
    let localStorage = this.appStorage(appName);
    if (uniqueId == localStorage.get("lastTimeKeyword_timelimit", -1)) {
      return localStorage.get("lastTimeKeyword");
    }
  },
  setThisTimeKeyword: function (appName, keyword, timeLimit) {
    let localStorage = this.appStorage(appName);
    localStorage.put("lastTimeKeyword", keyword);
    localStorage.put("lastTimeKeyword_timelimit", timeLimit);
  },
  setConsoleMinY: function (y, appName) {
    let localStorage = this.appStorage(appName);
    if (localStorage.get("consoleMinY", -1) == -1) {
      localStorage.put("consoleMinY", y);
    }
  },
  //会设置最小的那个
  setConsoleMaxY: function (y, appName) {
    log("设置控制台最大高度 %s", y);

    let localStorage = this.appStorage(appName);

    let maxY = localStorage.get("consoleMaxY", -1)
    if (maxY == -1) {
      localStorage.put("consoleMaxY", y);
    } else {
      if (y > maxY) {
        localStorage.put("consoleMaxY", y);
      }
    }
  },
  clearConsolePostion: function (appName) {
    let localStorage = this.appStorage(appName);
    localStorage.put("consoleMinY", -1);
  },
  getConsoleYRange: function (appName) {
    let localStorage = this.appStorage(appName);
    let consoleMaxY = localStorage.get("consoleMaxY", -1);
    if (consoleMaxY > -1) {
      let consoleMinY = localStorage.get("consoleMinY", -1);
      if (consoleMinY > -1) {
        consoleYRange = { minY: consoleMinY, maxY: consoleMaxY };
        return consoleYRange;
      }
    }
    return null;
  },
  incBootTimes: function () {
    let times = this.getBootTimes()
    this.setBootTimes(times + 1)
  },
  getBootTimes: function () {
    let localStorage = this.localStorage();
    return localStorage.get('bootTimes', 0)
  }, setBootTimes: function (times) {
    let localStorage = this.localStorage();
    localStorage.put('bootTimes', times)
  }
};

module.exports = { LocalStorage };
