---
title: "对接钉钉需要安装的前期工作"
slug: "k-1h9d4gn1k3g"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

#### 1、pnpm install dingtalk-jsapi --save 安装钉钉jsapi

#### 2、抛出免登录授权code
``` javascript
export function getLoginCode(callback: (arg0: string) => void) {
  if (dd.env.platform !== "notInDingTalk") {
    dd.ready(() => {
      //使用SDK 获取免登授权码
      dd.runtime.permission.requestAuthCode({
        corpId: 'ding5627ca703565a2d2bc961a6cb783455b',
        // @ts-ignore
        onSuccess: (info: { code: string; }) => {
          // 根据钉钉提供的api 获得code后,再次调用这个callback方法
          // 由于是钉钉获取code是异步操作,不知道什么时候执行完毕
          // callback 函数会等他执行完毕后在自己调用自己
          callback(info.code)
        },
        onFail: (err: any) => {
          alert('fail');
          alert(JSON.stringify(err));
        },
      });
    });
  }
}
```
