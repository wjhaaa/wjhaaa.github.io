 
---
title: "A开发秘籍"
slug: "k-bvvs89nka9"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

### 20250605 通过设置 ```autoFocusFirstInput``` 属性为 false 来禁用 ProForm 的自动聚焦行为：
### 20250539 使用脚本配置权限
```shell
#!/bin/bash

# 权限批量添加脚本
# 使用方法: ./add_permission_batch.sh

# API配置
API_URL="https://lvmhpro-gateway-api-dev.carbonstop.com/system/permission/add"

# 请求头配置
AUTH_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiY2FyYm9uZGN0In0.dxEHC14O4h0f6yzaB95vDUTcRu88MW8NrAybtDmqMek"

# 权限配置数组
# 格式: "权限名称|菜单类型|权限标识|排序号|备注|父ID"
permissions=(
  "编辑指标管理|F|/pom/edit|1|核算配置模块/指标管理/编辑|694"
  "复制指标管理|F|/pom/copy|2|核算配置模块/指标管理/复制|694"
  "查看指标管理|F|/pom/show|3|核算配置模块/指标管理/查看|694"
  "删除指标管理|F|/pom/delete|4|核算配置模块/指标管理/删除|694"
  "编辑数据|F|/pom/data/edit|5|核算配置模块/指标管理/编辑数据|694"
  "删除数据|F|/pom/data/delete|6|核算配置模块/指标管理/删除数据|694"
  "查看数据|F|/pom/data/show|7|核算配置模块/指标管理/查看数据|694"
)

# 创建临时文件
temp_file=$(mktemp)

# 遍历权限数组并执行API请求
for permission in "${permissions[@]}"; do
  # 分割权限配置
  IFS='|' read -r PERMISSION_NAME MENU_TYPE PERMS ORDER_NUM REMARK PID <<< "$permission"
  
  echo "正在添加权限: $PERMISSION_NAME"
  
  # 构建JSON请求体
  JSON_DATA=$(cat <<EOF
{
    "permissionName": "$PERMISSION_NAME",
    "menuType": "$MENU_TYPE",
    "perms": "$PERMS",
    "orderNum": "$ORDER_NUM",
    "remark": "$REMARK",
    "pid": $PID
}
EOF
)

  # 执行API请求，同时获取响应和状态码
  response=$(curl -s -w "%{http_code}" -o "$temp_file" -X POST "$API_URL" \
    -H "accept: application/json, text/plain, */*" \
    -H "accept-language: zh-CN,zh;q=0.9" \
    -H "authorization: $AUTH_TOKEN" \
    -H "cache-control: no-cache" \
    -H "content-type: application/json" \
    -H "origin: http://localhost:3005" \
    -H "pragma: no-cache" \
    -H "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" \
    --data-raw "$JSON_DATA")

  # 从临时文件读取响应内容
  response_content=$(cat "$temp_file")
  
  # 输出结果
  if [ "$response" -eq 200 ]; then
    echo "权限添加成功!"
  else
    echo "权限添加失败，HTTP状态码: $response"
  fi
  
  echo "API响应:"
  echo "$response_content" | jq . 2>/dev/null || echo "$response_content"
  echo "----------------------------------------"
done

# 删除临时文件
rm -f "$temp_file"
```
### 20250506 微信小程序上传文件api wx.shareFileMessage
### 20250416 处理父子点击事件冒泡
```javascript       
<div onClick={() => {}}>
        <Button
          onClick={e => {
            e.stopPropagation();
          }}
        >
          编辑
        </Button>
      </div> 
```
### 20250226 解决循环引用的eslint规则
- ```pnpm install eslint-plugin-import --save-dev```
- ```'import/no-cycle': 'warn'```
```javascript 
.eslintrc.js
module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-cycle': 'error'
  }
};
```
### 1、开发前一定要注意先创建merge request
### 2、在packagejson中启动命令增加。
- --host：编译出的代码运行的平台。`"dev": "vite --host"`
- --build：编译所用的机器的平台。
### vant-react 解决@import '~@vant/icons/src/encode-woff2.less'; 报错
```json
 resolve: {
    alias: [
      { find: /^~@vant/, replacement: resolve('node_modules/@vant') }
    ]
  },
```
### 3、解决项目报错 Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
- 要解决这个问题，我们需要通过编辑您的 parserOptions 来告诉 TypeScript ESLint 另一个 tsconfig.json 在哪里。
```javascript
parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
```
### 4、查看源
- ```pnpm get registry```
- ```pnpm config get registry```

### 5、临时修改
- ```pnpm --registry https://registry.npmmirror.com install any-touch```

### 6、永久修改
- ```pnpm config set registry https://registry.npmmirror.com```

### 7、还原
- ```pnpm config set registry https://registry.npmjs.org```

### 8、安装依赖报错
-  ERR_PNPM_UNEXPECTED_PKG_CONTENT_IN_STORE  Package name mismatch found while reading {"integrity":"sha512-PQO8sDIJ8SIwipTPiR71kJQCKQYB5NGImbOviK8K+kg5xkNSYXLBupuX9QhatFowrsvo9Hj8WgArg3W7ijNAQw==","registry":"https://registry.npmmirror.com/","tarball":"https://registry.npmmirror.com/@babel/traverse/-/traverse-7.17.9.tgz"} from the store. This means that the lockfile is broken. Expected package: @babel/traverse@7.17.10. Actual package in the store by the given integrity: @babel/traverse@7.17.9.
- 运行```rm -rf $(pnpm store path)```

### 9、项目打包后，antd组件的定位相关属性会被编译成inset属性，导致低版本浏览器不支持。
- 修改vite的配置文件中的cssTarget属性
- 
```javascript
build: {
manifest: true,
outDir,
target: ['es2019'],
sourcemap: isProduction ? false : true,
minify: !(isProduction || isPre) ? false : 'esbuild',
cssTarget: 'chrome85',
reportCompressedSize: true,
emptyOutDir: true,
}
```
### 10、如何在 React 开发中，有时我们需要对一个对象或数组进行修改操作，但是不希望影响原有的数据，这时我们需要对原始数据进行复制操作，从而得到一个新的对象或数组。以下是一些方法：

1. 手动复制对象或数组

我们可以使用 JavaScript 中的 `Object.assign()` 方法和扩展运算符 `...` 来手动复制对象或数组。这些方法是浅复制，只会复制对象或数组的第一层内容，但是不会复制对象或数组的子对象。

例如，我们可以使用 `Object.assign()` 方法对对象进行浅复制：

```jsx
const originalObj = { name: '张三' };
const newObj = Object.assign({}, originalObj); // 手动复制对象
newObj.name = '李四'; // 对复制后的对象进行修改操作
```

或者使用扩展运算符 `...` 来进行浅复制操作：

```jsx
const originalArray = [1, 2, 3];
const newArray = [...originalArray]; // 手动复制数组
newArray[0] = 4; // 对复制后的数组进行修改操作
```

2. 使用 `concat()` 方法或扩展运算符复制数组

当我们需要复制数组时，可以使用 `concat()` 方法或扩展运算符 `...` 进行复制。这种方式可以复制整个数组，包括数组的子对象。

例如，我们可以使用 `concat()` 方法复制数组：

```jsx
const originalArray = [{ id: 1 }, { id: 2 }];
const newArray = originalArray.concat(); // 使用 concat() 方法复制数组
newArray[0].id = 3; // 对复制后的数组对象进行修改操作
```

或者使用扩展运算符 `...` 进行复制：

```jsx
const originalArray = [{ id: 1 }, { id: 2 }];
const newArray = [...originalArray]; // 使用扩展运算符复制数组
newArray[0].id = 3; // 对复制后的数组对象进行修改操作
```

3. 使用 Lodash 库中的 `cloneDeep()` 方法

Lodash 是一个 JavaScript 工具库，提供了许多实用的工具函数。其中，`cloneDeep()` 方法可以对对象或数组进行深度复制，从而得到一个和原有对象或数组完全独立的新对象或数组。使用 `cloneDeep()` 方法还可以很好地解决浅复制和子对象复制的问题。

例如，我们可以使用 Lodash 库中的 `cloneDeep()` 方法对对象进行深度复制：

```jsx
import _ from 'lodash';

const originalObj = { name: '张三', scores: [80, 90, 85] };
const newObj = _.cloneDeep(originalObj); // 使用 Lodash 库的 cloneDeep() 方法
newObj.scores[0] = 85; // 对复制后的对象进行修改操作
```

以上是三种常用的复制数据的方法，根据实际情况选择合适的方式进行操作。

### 11、解决浏览器错误抛出
```json
    craco.config.js配置
    devServer: {
      client: {
        overlay: {
          runtimeErrors: false,
        },
      },
    },
```
### 12、解决图片地址资源无效时，失败处理
```javascript
<img :src="src" @error="handleImageError"/>
```
### 13、解决项目在执行 ```npm start``` 命令时发生了一个致命的运行时错误。具体来说错误信息中提到了```Too many open files```"（打开文件多）的问题。
- 在 macOS 上增加系统允许的最大打开文件数的方法可以通过修改 `/etc/sysctl.conf` 文件或使用 `launchctl limit` 命令来实现。下面是具体的步骤：

1. 打开终端应用程序。

2. 使用管理员权限运行以下令，编辑 `/etc/sysctl.conf` 文件：
   ```
   sudo nano /etc/sysctl.conf
   ```

3. 在打开文件中，添加以下行来增加最大打开文件数的限制：
   ```
   kern.maxfiles=65536
   kern.maxfilesperproc=65536
   ```

4. 按下 `Ctrl + X` 键，然后按 `Y` 键保存修改。

5. 运行以下令以重新加载 sysctl 配置：
   ```
   sudo sysctl -w kern.maxfiles=65536
   sudo sysctl -w kern.maxfilesperproc=65536
   ```

6. 现在，你可以尝试重新运行 `npm start` 命令，看看问题是否已经解决。

如果以上方法没有解决问题，你还可以尝使用 `launchctl limit` 命令来调整文件打开限。以下是使用该令的步骤：（中外运项目亲测，这个很管用。```launchctl limit```）

1. 打开终端应用程序。

2. 使用以下命令查看当前的文件打开限：
   ```
   launchctl limit maxfiles
   ```

3. 如果当前的限制较低，你可以使用以下命令将其增加到较高的值（例如 65536）：
   ```
   sudo launchctl limit maxfiles 65536 65536
   ```

4. 现在你可以尝试重新运 `npm start` 命令，看看问题是否已经解决。

请注意，在进行任何系统配置更改之前，请保你了解正在进行的操作，并且谨慎操作。如果你不确定如何执行这些步骤，建议咨有经验的系统管理员或查阅相关的 macOS 文和资源以获取更详细的指导。

### 14、 taro创建文件脚本
```javascript
/*
 * @@description:根据folderName的键值创建【键值】文件夹以及文件夹下的index.tsx和index.module.less
 * index.tsx自动生成为folderName的【键值】，并首字母大写。
 * folderName数据根据自己需要替换
 */
const fs = require("fs");

const folderName = {
  // 排放强度趋势分析
  rank: "/rank",
  store: "/store",
  task: "/task",
};

// 创建文件夹和文件
for (const key in folderName) {
  if (Object.hasOwnProperty.call(folderName, key)) {
    const folderPath = `${__dirname}${folderName[key]}`;
    fs.mkdirSync(folderPath, { recursive: true });
    const IndexName = `${key.replace(/^\w/, (c) => c.toUpperCase())}`;
    // 创建index.tsx文件并写入键值名称
    const indexTsxPath = `${folderPath}/index.tsx`;
    // index.tsx的模版内容
    const content = `import Taro from '@tarojs/taro';
    import { FC} from 'react'
    import './index.less';
    import { View } from '@tarojs/components';
    const Page: FC = () => {
      return <View>${IndexName}</View>;
    };
    export default Page;
    `;
    fs.writeFileSync(indexTsxPath, content, "utf8");
    // 创建index.module.less文件
    const indexModuleLessPath = `${folderPath}/index.less`;
    const indexConfigPath = `${folderPath}/index.config.ts`;
    fs.writeFileSync(indexModuleLessPath, "", "utf8");
    fs.writeFileSync(indexConfigPath, "", "utf8");
  }
}

```
### 15、下载文件流方法
```javascript
export const downloadFileFactor = (response: unknown, res: AxiosResponse) => {
  try {
    const disposition = res.headers['content-disposition'];
    const fileName = decodeURI(disposition?.split('filename=')?.[1] || '');
    const url = URL.createObjectURL(response as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    Toast('error', '文件下载失败');
  }
};
```

### 16、在遇到import图片资源，移动端没有展示，可以使用const 转换
```javascript
import sexBgImg from '@/assets/images/home/sex_1.png';
export const sexBg = sexBgImg;
```
### 17、判断表单里的值是否是null、undefined、空字符串方法
```javascript
export function allValuesPresent(
  obj: { [key: string]: any },
  fields?: (keyof typeof obj)[],
): boolean {
  if (!fields || fields.length === 0) {
    // 如果没有提供字段名数组，检查整个对象
    return (
      Object.entries(obj).length > 0 &&
      Object.values(obj).every(
        value => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === '')
      )
    );
  }

  // 如果提供了字段名数组，检查这些字段的值
  return fields.every(field => {
    const fieldValue = obj[field];
    return (
      fieldValue !== undefined &&
      fieldValue !== null &&
      !(typeof fieldValue === 'string' && fieldValue.trim() === '')
    );
  });
}
const obj = { a: 1, b: 'hello', c: null, d: '' };

console.log(allValuesPresent(obj)); // 输出 false
console.log(allValuesPresent(obj, ['c', 'd'])); // 输出 false
console.log(allValuesPresent(obj, ['a', 'c'])); // 输出 false
```
### 18、使用vscode批量替换 export default withTable\((.*)\)格式
- 使用正则：```export default withTable\((.*)\)```进行搜索,替换正则：```export default $1```
- 目标```export default withTable(User)```,期望得到```export default User```
- 使用正则：```const \{([^}]+)\} = useTable\(\);```进行搜索，替换正则：```const {$1, tableRef} = useTable();```
- 目标```const { xx , xx1} = useTable();```，期望得到```const { xx , xx1 , tableRef} = useTable();```
前端组 > A开发秘籍 > image2023-6-6_11-17-7.png前端组 > A开发秘籍 > image2023-7-20_11-50-0.png

前端组 > A开发秘籍 > image2023-10-19_18-47-35.png前端组 > A开发秘籍 > image2023-10-19_18-52-22.png



 

