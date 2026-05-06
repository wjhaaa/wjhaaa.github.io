---
title: "vscode批量替换withTable"
slug: "k-1noafmn0y74"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# vscode批量替换withTable

### 使用正则替换，搜索 widthTable\(([^)]+)\),替换输入$1
### 批量替换把withTable(*)给替换组件名为*的文件
1. 搜索框输入正则表达式：`widthTable\(([^)]+)\)`
2. 替换框输入：`$1`
3. 批量替换所有匹配项
