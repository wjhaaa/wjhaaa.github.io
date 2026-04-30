---
title: "年份数据option相关处理"
slug: "k-1g3e78jgugx"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 年份数据option相关处理

 

### 得出当前年度到指定的年份数据list
```javascript
/**
 * 得出当前年度到指定的年份数据list
 * @params specifyYear 指定年
 * @params currentYear 当前年
 * */
export const getCurrentYearList = (
  specifyYear: number,
  currentYear: number,
) => {
  let optionsArray: { label: string; value: string }[] = [];
  for (var i = specifyYear; i <= currentYear; i++) {
    optionsArray.push({ label: i.toString(), value: i.toString() });
  }
  return optionsArray.reverse();
};
```
