const { Robot } = require("./robot");
const { AutojsUtil } = require("./autojsUtil");
const { Config } = require("./config");

AutojsUtil.keepScreen();

AutojsUtil.configConsole("");

// 内存隔离，重新加载配置
Config.loadConfig();

AutojsUtil.AddFloatContrlButton(function () {
  Robot.start();
});


