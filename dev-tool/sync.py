import adbutils
from adbutils import adb
import glob
import os

# https://github.com/openatx/adbutils  要求python3.6
# https://blog.csdn.net/xiaoerbuyu1233/article/details/122124201

print("开始运行")

current_file_path = os.path.abspath(__file__)
parent_folder_path = os.path.dirname(current_file_path)
parent_folder_name = os.path.basename(parent_folder_path)

# d:\github\mtz\dev-tool\sync.py
# print(current_file_path)

workspaceRoot = current_file_path.replace("dev-tool\sync.py", "")
print("workspaceRoot: " + workspaceRoot)

paths = workspaceRoot.split("\\")
# print(paths)

workspaceName = paths[len(paths) - 2]

print("workspaceName: " + workspaceName)

phonePath = "/storage/emulated/0/autojs/" + workspaceName + "/"
phoneBuildPath = "/storage/emulated/0/autojs/" + workspaceName + "/inHereBuild/"

files = {
    r"**/*.js",
    r"**/*.png",
    r"**/*.jpg",
    r"**/*.xml",
    r"**/*.mp3",
    r"**/project.json",
}

ignore_files = {
    r"**/test.js",
    r"**/debug/**",
}


def testIgnore(f):
    for ignore_file_glob in ignore_files:
        for igf in glob.glob(ignore_file_glob, recursive=True):
            if igf == f:
                print("忽略文件：" + f)
                return True
    return False


adb = adbutils.AdbClient(host="127.0.0.1", port=5037)
for info in adb.list():
    print(info.serial, info.state)
    # <serial> <device|offline>

for d in adb.device_list():
    print(d.serial)  # print device serial
    # # 点亮屏幕
    # d.shell("input keyevent KEYCODE_POWER")
    # # 解锁
    # d.shell("input keyevent 82")
    # # 关屏时间
    # d.shell("settings put system screen_off_timeout 10000000")
    # # 屏幕常亮？？ https://www.jianshu.com/p/bae933aac556   在我的手机上，不管用。。。妈的
    # d.shell("svc power stayon usb")

    # glob的 ** 在windows下好像不管用？？？！！！
    for fp in files:
        for f in glob.glob(fp, recursive=True):
            if not testIgnore(f):
                lPath = workspaceRoot + f
                pPath = (phonePath + f).replace("\\", "/")
                bPath = (phoneBuildPath + f).replace("\\", "/")
                print(lPath + "   >>>   " + pPath)
                print(lPath + "   >>>   " + bPath)
                d.sync.push(lPath, pPath)
                d.sync.push(lPath, bPath)


print("运行结束")

# print("====================同时更新压缩包============================")
# # import publicZip
