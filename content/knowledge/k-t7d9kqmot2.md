---
title: "loadsh一些用法"
slug: "k-t7d9kqmot2"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# loadsh一些用法

 

#### 1、isFinite
```typescript
检查 value 是否是原始Number数值型 或者 对象。
注意: 要排除 Infinity, -Infinity, 以及 NaN 数值类型，用_.isFinite 方法。
```
### 2、map([],'key值')
```typescript
快速得到array类型
map(chartData?.annualOutput, 'year')
```
### 3、`head`拿到数组的第一个元素
```typescript
  const titleData = map(chartData?.annualOutput, 'year');
  head(titleData)
```
### 4、```isNil```判断null或undefined




 

