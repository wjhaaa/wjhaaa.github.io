---
title: "webview组件跳转参数为url时，字段丢失问题"
slug: "k-164dtcpe0z4"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# webview组件跳转参数为url时，字段丢失问题

### 解决办法使用
- encodeURIComponent进行转化
- decodeURIComponent解开
- https://www.runoob.com/jsref/jsref-decodeuricomponent.html