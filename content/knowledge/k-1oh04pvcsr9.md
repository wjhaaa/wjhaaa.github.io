---
title: "转化图片的方法"
slug: "k-1oh04pvcsr9"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 转化图片的方法

### 转化图片方法 
```javascript 
// 转化图片 
export const isBakImgArrString = (inputString: string): { url: string }[] => { 
try { 
const arr = JSON.parse(inputString);
 if (Array.isArray(arr)) {
 return arr; 
} 
} catch (error) { 
// 解析失败，不是数组转化后的字符串 
} 
return []; 
}; 
```
