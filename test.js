let hasGetCapturePremission = false

function autoPermisionScreenCapture() {
    if (hasGetCapturePremission) {
        log("当前有截图权限");
        return;
    }

    console.log("自动申请截图权限");
    let Thread = threads.start(function () {
        if (auto.service == null) {
            toast("无障碍未开启")
            return
        }

        let ele = textMatches(/(.*录屏或投屏.*|.*录制或投射.*|允许|立即开始|统一)/).findOne(10 * 1000)

        if (ele == null) {
            toast("未能发现截图权限弹窗")
            return
        }
        log("已经弹出权限确认界面")

        let eles = textMatches(/(.*录屏或投屏.*|.*录制或投射.*|允许|立即开始|统一)/).find()

        if (eles.empty()) {
            toast("未能发现截图权限弹窗")
            return
        }

        let notMiui14Style = false
        for (let e of eles) {
            let text = e.text()
            if (text.indexOf('立即开始') > 0 || text.indexOf('允许') > 0 || text.indexOf('统一')) {
                notMiui14Style = true
                break
            }
        }

        if (notMiui14Style) {
            log("可以找到立即开始")
            let allowEle = textMatches(/(允许|立即开始|统一)/).findOne(10 * 1000);
            if (allowEle) {
                sleep(1500)
                if (allowEle.clickable()) {
                    log("点击 元素")
                    let ok = allowEle.click();
                    return ok;
                } else {
                    let b = allowEle.bounds()
                    log("按压 坐标")
                    return press(b.centerX(), b.centerY(), 1)
                }
            }
        } else {
            //  在miui 14中，立即开始，不可找到。使用推测的方式来处理
            log("推测 立即开始 坐标")

            let cancel = text("取消").findOne(10 * 10000)
            if (cancel) {
                log("取消 按钮 存在")
                let x = device.width - cancel.bounds().centerX()
                let y = cancel.bounds().centerY()

                log("点击 推测坐标 %s %s", x, y)
                sleep(1500)
                press(x, y, 1)
            } else {
                log("取消按钮不存在，推测失败")
            }
        }

    });

    log("申请权限");

    //在一个会话中，调用两次申请截图权限。就会卡死。
    if (!requestScreenCapture(false)) {
        toast("请求截图权限失败");
        return false;
    } else {

        Thread.interrupt();
        log("已获得截图权限");
        hasGetCapturePremission = true;
        return true;
    }
}

autoPermisionScreenCapture()