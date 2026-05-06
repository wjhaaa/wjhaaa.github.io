---
title: "按1920*1080的尺寸进行等比缩放并垂直水平居中"
slug: "k-1x34aeglfua"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 按1920*1080的尺寸进行等比缩放并垂直水平居中

 

### 具体实现方法
```javascript
/*
 * @@description: 控制页面按照1920*1080进行比例缩放
 */
import { useEffect, useState } from 'react';

const idealWidth = 1920;
const idealHeight = 1080;

function useResponsiveScale() {
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMultipleOfIdeal =
        screenWidth % idealWidth === 0 && screenHeight % idealHeight === 0;

      if (isMultipleOfIdeal) {
        const multiple = screenWidth / idealWidth;
        setContainerStyle({
          width: `${idealWidth}px`,
          height: `${idealHeight}px`,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${multiple})`,
        });
      } else {
        const scaleWidth = screenWidth / idealWidth;
        const scaleHeight = screenHeight / idealHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        setContainerStyle({
          width: `${idealWidth}px`,
          height: `${idealHeight}px`,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
        });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 也在初次挂载时调用

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return containerStyle;
}

export default useResponsiveScale;

```
