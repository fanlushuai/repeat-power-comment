// "ui";
// // 线程的开启和结束情况
// log("xx %s", threads.currentThread());
// threads.start(function () {
//   threads.start(function () {
//     log("2 %s", threads.currentThread());
//     sleep(5000);
//     log("shutDonwAll");
//     threads.shutDownAll(); //在ui线程是关闭不掉的。
//     // exit();   //ui线程一并关闭
//     while (1) {
//       log("2");
//       sleep(1000);
//     }
//   });
//   while (1) {
//     log("1");
//     sleep(1000);
//   }
// });

// // threads.start(function () {
// //   log("2");
// //   sleep(5000);
// //   log("shutDonwAll");
// //   threads.shutDownAll();
// //   while (1) {
// //     log("2");
// //     sleep(1000);
// //   }
// // });

engines.execScriptFile("t2.js");
// while (1) {
// log("t1");
// sleep(5000);
// threads.shutDownAll(); //只能控制线程，还不包含ui线程

// engines.stopAll();
// engines.myEngine().toString();
// log("开始停止当前脚本引擎");

// log("当前引擎： %s", engines.myEngine().toString());
// engines.all().map((ScriptEngine) => {
//   log("存在的脚本引擎 %s", ScriptEngine.toString());
//   //   if (engines.myEngine().toString() != ScriptEngine.toString()) {
//   //     log("停止当前脚本引擎 %s", engines.myEngine().toString());
//   //     engines.myEngine().forceStop();
//   //   }
// });
// }

// function stopOtherScriptEngine() {
//   log("当前引擎 %s", engines.myEngine().toString());
//   engines.all().map((ScriptEngine) => {
//     log("存在引擎 %s", ScriptEngine.toString());
//   });

//   engines.all().map((ScriptEngine) => {
//     if (engines.myEngine().toString() != ScriptEngine.toString()) {
//       log("停止其他引擎 %s", engines.myEngine().toString());
//       ScriptEngine.forceStop();
//     }
//   });
// }

// stopOtherScriptEngine();
