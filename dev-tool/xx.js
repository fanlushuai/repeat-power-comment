// id('g6t').findOne().click()
// id('tkv').findOne().click()
// id('tku').findOne().click()
// id('tj4').findOne().click()
// id('d7h').findOne().click()
// id('lwb').findOne().click()
// id('s=q').findOne().click()
// id('tbv').findOne().click()
// id('s+o').findOne().click()
// id('c=c').findOne().click()
// id('d=w').findOne().click()
// id('g=_').findOne().click()
// id('iia').findOne().click()

const { AutojsUtil } = require("../autojsUtil");


AutojsUtil.autoPermisionScreenCapture()
var text = "";
var img = captureScreen(); // 截取当前屏幕图像
var clip = images.clip(img, 0, 0, device.width, device.height / 2); // 裁剪图像，只保留上半部分
var res = ocr.recognize(clip); // 识别文字
if (res.text) {
    text = res.text;
}
toast(text); // 弹出识别结果
