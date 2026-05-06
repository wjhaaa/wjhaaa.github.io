---
title: "antd DatePicker设置时间范围"
slug: "k-2bpgbket3s8"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# antd DatePicker设置时间范围

``` javascript
  /** 不可选择的时间 */
  const disabledDate: RangePickerProps<Moment>['disabledDate'] = current => {
    return (
      current < moment().startOf('day') || current > moment().add(30, 'day')
    );
  };
	
   <DatePicker bordered={false} disabledDate={disabledDate} /> 
```
``` javascript
/** 只展示当前年份-2008年 */
```