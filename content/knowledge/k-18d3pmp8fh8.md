---
title: "Protable使用过程中的问题"
slug: "k-18d3pmp8fh8"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# Protable使用过程中的问题

 

### 去掉展示收起
- ```collapseRender: () => null```
### 去掉表格边距
- ```ghost```
### 在column中修改字段name值,并且不展示label文本
```javascript
formItemProps: {
label: false,
name: 'likeName',
}
```
 

