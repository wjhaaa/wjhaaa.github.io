---
title: "小程序开发注意点"
slug: "k-wl7da6olp"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 小程序开发注意点

 

### 需要在app.js中加入版本更新弹窗提示、一定要在第一个版本就加上
``` javascript
  onLaunch() {
    if (!wx.canIUse("getUpdateManager")) return;
    let updateManager = wx.getUpdateManager();
    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    updateManager.onCheckForUpdate(function (res) {
      // 监听向微信后台请求检查更新结果事件 
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          //当新版本下载完成，会进行回调          
          wx.showModal({
            title: '更新提示',
            content: '检测到有新版本，请单击确定更新小程序',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启小程序               
                updateManager.applyUpdate();
              }
            }
          })
        })
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）        
        updateManager.onUpdateFailed(function () {
          //当新版本下载失败，会进行回调          
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请稍后尝试',
            showCancel: false,
          })
        })
      }
    });
  },
```
### 去掉小程序按钮默认的黑色边框
```css
   .sharebtn::after {
          border: none;
        }
```
### 小程序字体引入
```css
@font-face {
  font-family: "HarmonyOSHeiTi";  /* 这里的字体名称是自定义的 */
  src: url("https://h5.amemori.cn/h5/font-css/1.ttf"); /* 服务器上ttf文件的路径，记得配置域名权限 */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.a{
 font-family: "HarmonyOSHeiTi"; 
}
```
 

