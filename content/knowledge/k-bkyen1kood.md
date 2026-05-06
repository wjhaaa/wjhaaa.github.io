---
title: "npm发包的过程"
slug: "k-bkyen1kood"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# npm发包的过程

 

#### npm包的过程 写一个antd（button）+React+Typescript+Vite的带loading状态的按钮组件。
- 1、先注册一个npm账户 https://www.npmjs.com/
- 2、命令安装： 
- ```pnpm init ``` 初始化
- 安装一系列的antd、react、vite等需要的依赖。
- 3、根目录增加vite.config.js
```javascript
lib的name是package.json中的name的值。库/模块的名字
export default {
  build: {
    lib: {
      entry: 'index.ts',
      name: 'loading-button-tzj',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
};
```
- 4、根目录增加index.ts/tsx文件，用于导出按钮组件
```javascript
export { default as LoadingButton } from './src/Button';
```
- 5、新增src目录下的Button.tsx
```javascript
import { Button, ButtonProps } from 'antd';
import React, { useState } from 'react';

interface LoadingButtonProps extends ButtonProps {
  onClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
}

const CustomButton = ({ onClick, ...props }: LoadingButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handelClick: React.MouseEventHandler<HTMLElement> = ev => {
    if (loading) return;
    setLoading(true);
    onClick?.(ev)?.finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };
  return (
    <Button {...props} loading={loading} onClick={handelClick}>
      {props.children}
    </Button>
  );
};

export default CustomButton;

```
- 6、配置package.json,主要配置打包命令和包的名字。每次更新需要修改版本号和描述。
```json
{
  "name": "loading-button-tzj",
  "version": "1.0.6",
  "description": "重新修改按钮loading组件",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "vite build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react-refresh": "^1.3.6",
    "antd": "^5.7.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.1.6",
    "vite": "^4.4.5"
  }
}
```
- 7、打包完成后使用```npm login``` + ```npm publish```进行发包就完成了。
- 终端输入```npm login```进行登录
- 登录成功后```npm publish```进行推送
- 这里可能会出现的问题是，npm的地址是```https://registry.npmjs.org/```，如果我们电脑的npm是```https://registry.npmmirror.com/```的话，需要先切换源，然后再推送。
- 切换源的命令```npm config set registry [地址]```

 

