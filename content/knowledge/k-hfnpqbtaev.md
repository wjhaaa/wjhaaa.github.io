---
title: "执行创建数据接口的脚本"
slug: "k-hfnpqbtaev"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# 执行创建数据接口的脚本

 

### 粘贴cUrl数据值，在当前文件所在位置执行./run_curl.sh 30
- 30 代表执行次数
- json_data是我们要传入的具体数据
```sh 
#!/bin/bash
# 指定要执行的次数
n=$1

# 定义一个包含英文单词和中文词汇的数组
words=("apple" "banana" "cherry" "date" "fig" "grape" "melon" "苹果" "香蕉" "樱桃" "日期" "无花果" "葡萄" "哈密瓜")

# 使用 for 循环来执行 cURL 命令
for (( i=1; i<=n; i++ ))
do
  # 生成两个随机数索引
  index1=$((RANDOM % ${#words[@]}))
  index2=$((RANDOM % ${#words[@]}))

  # 构造 JSON 数据
  json_data="{\"searchWords\":\"${words[$index1]}\", \"relatedWords\":\"${words[$index2]}\"}"

  # 执行 cURL 命令
  curl -X POST 'https://unicom-gateway-dev-internal.carbonstop.com/system/associated_vocabulary/add' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'accept-language: zh-CN,zh;q=0.9' \
    -H 'authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MDY3MTUwLCJpYXQiOjE3MTI0NzUxNTAsImp0aSI6ImM3YjVjNDUyNDg4NzRjY2ZhZWMxNmEzNmVmMmJhY2I1IiwidXNlcl9pZCI6MywibmFtZSI6ImFkbWluIiwibW9iaWxlIjoiMTM3MTExMTExMTEifQ.ssmThBRlgGksACKrRLEZ9QAVNWiUvJYamOecSrfQQMc' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -H 'origin: http://localhost:3005' \
    -H 'pragma: no-cache' \
    -H 'priority: u=1, i' \
    -H 'referer: http://localhost:3005/' \
    -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-dest: empty' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-site: cross-site' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' \
    --data-raw "$json_data"
  
  echo "Executing time: $i with data: $json_data"
  echo ""  # 打印一个空行作为分隔
done

echo "Done executing the cURL command $n times."
  
```

### 创建审批流数据脚本
- words为所属域的id值
- 数值类型，在 Bash 脚本中定义数组时，数组元素之间需要用空格分隔，不需要逗号。这是因为 Bash 使用空格（或其他空白字符，如制表符和换行符）来分隔数组元素。
```sh
#!/bin/bash

# 指定要执行的次数
n=$1

# 定义一个包含英文单词和中文词汇的数组
words=(2 3 121 122 123 124 128 129 130 131 134 135 137 138 139 141 142 143 144 145 146 147 148)

# 使用 for 循环来执行 cURL 命令
for (( i=1; i<=n; i++ ))
do
  # 生成两个随机数索引
  index1=$((RANDOM % ${#words[@]}))

  # 构造 JSON 数据
 json_data="{\"auditRequired\":2, \"auditType\":4, \"orgId\":${words[$index1]}}"

  # 执行 cURL 命令
  curl 'https://unicom-gateway-dev-internal.carbonstop.com/system/audit/add' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MDY3MTUwLCJpYXQiOjE3MTI0NzUxNTAsImp0aSI6ImM3YjVjNDUyNDg4NzRjY2ZhZWMxNmEzNmVmMmJhY2I1IiwidXNlcl9pZCI6MywibmFtZSI6ImFkbWluIiwibW9iaWxlIjoiMTM3MTExMTExMTEifQ.ssmThBRlgGksACKrRLEZ9QAVNWiUvJYamOecSrfQQMc' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'origin: http://localhost:3005' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'referer: http://localhost:3005/' \
  -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' \
  --data-raw "$json_data"
  
  echo "Executing time: $i with data: $json_data"
  echo ""  # 打印一个空行作为分隔
done

echo "Done executing the cURL command $n times."

```
 

