---
title: "下载文件流遇到的问题"
slug: "k-5ls18milje"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 下载文件流遇到的问题



### 因为项目使用了mock，并且在src/index页面中引入，导致联调文件流下载的时候，文件流格式变成了字符串，浪费时间查找原因。
- mockjs源码导致了文件流被responseType:json'解析了,因此无法正确识别
- 例如 arrayBuffer 使用 new Uint8Array(data)
- 例如 Blob 使用 new Blob([new Uint8Array(data)], { type: 'application/json' })