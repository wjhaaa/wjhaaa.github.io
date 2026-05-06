---
title: "处理时间相关的方法"
slug: "k-2dptyu7uj8"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 处理时间相关的方法

 

### 一些处理时间的方法
```javascript
// 获取当前是几季度
export const renderCurrentQuarter = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript中月份从0开始，所以需要+1
  if (currentMonth >= 1 && currentMonth <= 3) {
    return '1';
  } else if (currentMonth >= 4 && currentMonth <= 6) {
    return '2';
  } else if (currentMonth >= 7 && currentMonth <= 9) {
    return '3';
  } else {
    return '4';
  }
};

// 获取当前年份
export const renderCurrentYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

// 处理成xx月xx日格式
export const formatDate=(dateStr:string)=> {
  const [month, day] = dateStr.split('-');
  return `${month}月${day}日`;
}

// 处理成xx-xx格式 dateString是年月日的格式
export const formatKineDate = (dateString: string | number | Date, includeYear: boolean = false) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  if (!includeYear) {
    return `${month}-${day}`;
  } else {
    return `${month}月${day}日`;
  }
};
```
 

