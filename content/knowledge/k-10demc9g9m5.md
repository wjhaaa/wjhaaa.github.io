---
title: "小程序使用wxml-to-canvas生成分享海报"
slug: "k-10demc9g9m5"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

### 小程序使用wxml-to-canvas生成分享海报
- 安装命令：`npm install --save wxml-to-canvas`
- 小程序内通过静态模板和样式绘制 canvas ，导出图片，可用于生成分享图等场景
- 适用于排版不是很复杂的海报，一般纵向排版都能实现，比较方便快速。
- 样式名字需要使用驼峰法命名。
- 文档地址：[wxml-to-canvas文档地址](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/wxml-to-canvas.html)
- 使用方法：
```json
 // 在安装后在json文件中引入
 "usingComponents": {
    "wxml-to-canvas": "wxml-to-canvas"
  },
```
```javascript
/** 新建一个js文件 */
const wxmlFun = (showCertificate) => {
  return `
  <view class="cfWrapper">
    <view>
      <image src="https://oss-saas.carbonstop.net/carbonAccount/bg-certificate@2x.png" class="image1" />
      <image src="${showCertificate.url}" class="hb" />
    </view>

    <view class="cfTitle">
     <text class="text">${showCertificate.title}</text>
    </view>

    <view class='cfTitleImg'>
    <image src="https://oss-saas.carbonstop.net/carbonAccount/icon-cf-decoration@2x.png" class="imageCfTitle" />
    </view>

    <view class='userPersonName'>
    <text class='thankYouTitle'>谢谢你，</text>
    <text class='personName'>${showCertificate.title}:</text>
    </view>

    <view class='paragraphOne'>
    <text class='paragraphOneInfo'>碳账户记录了你的低碳生活，最近这段时间，你一共减碳${showCertificate.count}${showCertificate.unit}，相当于3棵树1年的吸收量。</text> 
    </view>

    <view class='paragraphOne paragraphTwo'>
    <text class='paragraphOneInfo'>现在碳阻迹为你颁发低碳荣誉证书，并授予“${showCertificate.ch}”称号，愿你在未来的日子，保持热爱，低碳生活～</text> 
    </view>

    <view class='partingMain'>
     <image src="https://oss-saas.carbonstop.net/carbonAccount/share-line.png" class="parting" />
    </view>

    <image src="${showCertificate.stampUrl}" class="imgStamp" />

    <view class='certificateNumber'>
    <text class='numberContent'>证书编号：</text>
    <text class='numberValue'>${showCertificate.number}</text>
    </view>

    <view class='certificateNumber certificateTime'>
    <text class='numberContent'>获取时间：</text>
    <text class='numberValue'>${showCertificate.time}</text>
    </view>

    <view class='certificateNumber certificateTime'>
    <text class='numberContent'>种植地点：</text>
    <text class='numberValue'>${showCertificate.time}</text>
    </view>

    <view class='codeMain'>
    <image src="${showCertificate.stampUrl}" class="codeImg">
    </view>
    
    <view class='codeTextMain'>
      <text class='codeText'>扫码加入低碳联盟</text>
    </view>

  </view>
`
const style = {
  cfWrapper: {
    width: 650,
    height: 1024,
    backgroundColor: '#FFF',
    position: 'relative'
  },
  image1: {
    width: 650,
    height: 186
  },
  hb: {
    width: 195,
    height: 195,
    position: 'absolute',
    left: 26,
    top: 35,
  },
  // 低碳荣誉证书标题父级盒子
  cfTitle: {
    width: 650,
    height: 60,
    marginTop: 40,
  },
  // 低碳荣誉证书标题
  text: {
    width: 650,
    height: 60,
    textAlign: 'center',
    color: '#333333',
    fontWeight: 500,
    fontSize: 36,
  },
  // 低碳荣誉证书图片父级盒子
  cfTitleImg: {
    width: 650,
    height: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // 低碳荣誉证书图片
  imageCfTitle: {
    width: 216,
    height: 14,
  },
  // 用户名字父级盒子
  userPersonName: {
    width: 650,
    minHeight: 50,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // 谢谢你文字
  thankYouTitle: {
    width: 104,
    height: 50,
    fontWeight: 400,
    fontSize: 26,
    color: '#333333',
    verticalAlign: 'middle',
  },
  // 用户名字
  personName: {
    width: 550,
    height: 50,
    fontWeight: 500,
    fontSize: 32,
    color: '#333333',
    verticalAlign: 'middle',
  },
  // 证书信息段落1
  paragraphOne: {
    width: 650,
    height: 78,
    paddingLeft: 50,
    marginTop: 20,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // backgroundColor: 'orange',
  },
  paragraphTwo: {
    width: 650,
    height: 117,
  },

  // ”碳账户记录了你的低碳生活，最近这段时间，你一共减碳“文案
  paragraphOneInfo: {
    width: 550,
    height: 117,
    fontWeight: 400,
    fontSize: 26,
    color: '#333333',
  },
  // // ”9999g“文案
  // paragraphOneInfoKG: {
  //   minWidth: 130,
  //   height: 78,
  //   fontWeight: 400,
  //   fontSize: 26,
  //   color: '#0CBF9F',
  // },
  // partingMain 分割线父级盒子
  partingMain: {
    width: 650,
    height: 10,
    paddingLeft: 50,
    marginTop: 20
  },
  // parting 分割线
  parting: {
    width: 550,
    height: 10,
  },

  // imgStamp 盖章
  imgStamp: {
    width: 200,
    height: 200,
    position: 'absolute',
    right: 50,
    top: 475
  },

  // 证书编号父级盒子
  certificateNumber: {
    width: 550,
    height: 37,
    // backgroundColor: 'orange',
    marginLeft: 50,
    marginTop: 30,
    flexDirection: 'row',
  },
  // 证书编号文案
  numberContent: {
    width: 130,
    height: 37,
    fontWeight: 400,
    fontSize: 26,
    color: '#333333',
    verticalAlign: 'middle',
  },

  // 证书编号值 
  numberValue: {
    width: 420,
    height: 37,
    fontWeight: 400,
    fontSize: 26,
    color: '#0CBF9F',
    textAlign: 'right',
    verticalAlign: 'middle',
  },

  // 获取时间
  certificateTime: {
    marginTop: 20
  },

  // 扫码加入低碳联盟父级盒子
  codeMain: {
    width: 550,
    height: 120,
    flexDirection: 'column',
    marginLeft: 50,
    alignItems: 'center'
  },
  // 二维码图片
  codeImg: {
    width: 120,
    height: 120,
    marginTop: 18
  },
  // 二维码文字父级盒子
  codeTextMain: {
    width: 550,
    height: 28,
    flexDirection: 'column',
    alignItems: 'center',
  },

  // 二维码文字
  codeText: {
    width: 160,
    height: 28,
    fontWeight: 400,
    fontSize: 20,
    color: '#333333',
  }
}

module.exports = {
  wxmlFun,
  style
} }
```
- 在wxml项目中引用
```html
<wxml-to-canvas class="widget" width='650' height='1024'></wxml-to-canvas>
```
- 在js项目中引用
```javascript
const { wxmlFun, style } = require('./achievement.js');
 onLoad() {
    this.widget = this.selectComponent('.widget');
  },
/** 生成海报函数 */
  saveCertificate() {
    wx.showLoading({
      title: '保存中',
    });
    const wxml = wxmlFun(this.data.showCertificate);
    const p1 = this.widget.renderToCanvas({ wxml, style });
    p1.then(res => {
      this.container = res;
      return this.widget.canvasToTempFilePath({
        fileType: 'jpg',
      });
    }).then(res => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath, //canvasToTempFilePath返回的tempFilePath
        success: (res) => {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail: (err) => {
          console.log(err)
          wx.hideLoading()
        }
      })
    })
  },
```
