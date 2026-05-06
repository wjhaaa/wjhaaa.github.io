---
title: "云闪付小程序开发注意点"
slug: "k-231egzlft5l"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 云闪付小程序开发注意点


### 为徽章增加蒙层
- ```filter: brightness(0.5);```
### 制作引导页、个人中心方法论提示效果
- 只需要增加蒙版、给元素增加定位层级就可以了。
### 判断是否云闪付环境
```javascript
var agent = navigator.userAgent.toLowerCase(); 
var isInsideWallet = ((new RegExp(/(com.unionpay.chsp)/).test(agent)) || (new RegExp(/(com.unionpay.mobilepay)/).test(agent)));

```
### 一个可以复用的vant分页hook
```javascript
/*
 * @@description:
 * @Author: wangjiahui 1379923472@qq.com
 * @Date: 2022-12-04 21:16:09
 * @LastEditors: wangjiahui 1379923472@qq.com
 * @LastEditTime: 2022-12-15 15:49:39
 */
import type { Ref } from 'vue';
import { ref } from 'vue';
// import { PromiseFunc, IPage } from '~/@types/configure' // ts 类型
type PromiseFunc = (params?: any) => Promise<any>;
interface IPage {
  pageNo: number;
  pageSize: number;
}

const useListRefresh = <T>(): {
  pagination: Ref<IPage>;
  listData: Ref<T[]>;
  loading: Ref<boolean>;
  finished: Ref<boolean>;
  refreshing: Ref<boolean>;
  getListData: (func: PromiseFunc) => Promise<any>;
  refreshCallback: (func: PromiseFunc) => void;
  loadMore: (func: PromiseFunc) => void;
} => {
  const pagination = ref<IPage>({
    pageNo: 1,
    pageSize: 20,
  });
  const listData = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);

  const getListData = async (func: PromiseFunc) => {
    const res = await func();
    if (refreshing.value) {
      refreshing.value = false;
      listData.value = [];
    }
    const list = res?.data?.data?.list || [];
    if (pagination.value.pageNo > 1) {
      listData.value = listData.value.concat(list);
    } else {
      listData.value = list;
    }
    loading.value = false;
    if (listData.value.length >= res?.data?.data?.total) {
      finished.value = true;
    } else {
      finished.value = false;
    }
  };
  const refreshCallback = (func: PromiseFunc) => {
    finished.value = false;
    loading.value = true;
    pagination.value.pageNo = 1;
    setTimeout(() => {
      getListData(func);
    }, 200);
  };
  const loadMore = async (func: PromiseFunc) => {
    pagination.value.pageNo += 1;
    getListData(func);
  };
  return {
    pagination,
    listData,
    loading,
    finished,
    refreshing,
    getListData,
    refreshCallback,
    loadMore,
  };
};
export default useListRefresh;

```
### 修改小程序标题
```javascript
/** 修改当前页面标题 */
export function onTitleUpSdk(titleValue: string) {
  upsdk.pluginReady(function () {
    upsdk.setNavigationBarTitle({
      title: titleValue,
    });
  });
}
```
### 获取云闪付小程序code码
```javascript
/** 获取authcode  */
export function getUserAuthCode(callback: (arg0: string) => void) {
  upsdk.pluginReady(function () {
    upsdk.appletAuth({
      success: function (data: { code: string }) {
        callback(data.code);
      },
      fail: function () {},
    });
  });
}

```
### 唤起分享面板
- https://opentools.95516.com/applet/#/docs/scene/jump/jump?timestamp=1675842719499&id1=scene&id2=jump&id=_03090202 
```javascript
/** 设置分享小程序 */
let params = Base64.encode(
  JSON.stringify({
    toLink: encode('http://union-app-test.carbonstop.net'),
    encryptAppId: '30efa34be9b97dad',
  })
);

/** 设置分享小程序 */
export function onShareUpSdk() {
  upsdk.pluginReady(function () {
    return upsdk.showSharePopup({
      title: '邀请您加入低碳家园',
      desc: '快来加入低碳家园吧～',
      shareUrl: `https://base.95516.com/s/wl/WebAPP/helpAgree/page/help/shareRutineHelp.html?params=${params}`,
    });
  });
} 
```