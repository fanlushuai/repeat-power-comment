
@echo off

setlocal enabledelayedexpansion

set PC_FOLDER_PATH=!cd!\.
echo %PC_FOLDER_PATH%

for %%* in (.) do set "CURRENT_FOLDER_NAME=%%~nx*"
echo please set script path  autojs/%CURRENT_FOLDER_NAME% in android autojsx

set PHONE_FOLDER_PATH=/storage/emulated/0/autojs/%CURRENT_FOLDER_NAME%
set PHONE_BUILD_FOLDER_PATH=/storage/emulated/0/autojs/%CURRENT_FOLDER_NAME%/inHereBuild

adb devices
 
:devicecheck
adb get-state | find "device"
if %errorlevel% neq 0 (
    echo device can not found please check your connect
    pause
    exit
)

echo "%PC_FOLDER_PATH%"
echo "%PHONE_FOLDER_PATH%"
echo "%PHONE_BUILD_FOLDER_PATH%"

adb shell mkdir -p "%PHONE_FOLDER_PATH%"
adb push "%PC_FOLDER_PATH%" "%PHONE_FOLDER_PATH%"
adb push "%PC_FOLDER_PATH%" "%PHONE_BUILD_FOLDER_PATH%"
@REM adb disconnect

endlocal
