---
title: "shell命令、nginx"
slug: "k-1tz2v1s4xa1"
date: "2026-04-30"
type: "note"
tags: []
summary: ""
---

# shell命令、nginx


#### tar -cvf test.tar tar 
- 将tar文件夹下的文件生成为test.tar。将类型的文件归档，并备份类型的文件
### ssh连接远程服务器
- 首先打开终端，然后输入```	sudo su -``` 回车进入根目录
- 然后输入：```ssh -p 端口号 服务器用户名@ip``` （例如ssh -p 22 root@127.0.0.1） 
- 回车，到这会让你输入yes或者no来确认是否连接，输入yes回车
- 到此进入的是你在服务器上的账户的目录，即为连接成功,，最后输入```sudo su -```进入服务器的根目录，进行操作
- 退出连接服务器：快捷键```Ctrl+D```
### 增加一个vscode使用remote ssh远程连接服务器
- 扩展安装remote ssh
- [https://blog.csdn.net/zhaxun/article/details/120568402](修改远程项目文件)
### shell命令
- 单个参数：ls -a（a 是英文 all 的缩写，表示“全部”）
- 多个参数：ls -al（全部文件 + 列表形式展示）
- 单个长参数：ls --all
- 多个长参数：ls --reverse --all
- 长短混合参数：ls --all -l
### Homebrew 是一个包管理器，用来在 macOS 安装 Linux 工具包
- `/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
- 敲击完毕后输入 1
- 然后 yes 并 属于自己的密码 后 等待安装即可。
###  translate-shell用不了啦 中国谷歌翻译下架了，说是使用率太低
- 使用fanyi安装包 https://www.npmjs.com/package/fanyi 在终端进行翻译

### Iterm使用方法 iTerm2是一款相对比较好用的终端工具,iTerm2常用操作包括主题选择、声明高亮、自动填充建议、隐藏用户名和主机名、分屏效果等。

- 使用 Cmd + D（左右）或者 Cmd + Shift + D（上下）进行分屏使用
- https://iterm2.com/features.html Nginx 是一个非常流行的 Web 服务器软件和反向代理服务器，前端开发人员有必要了解一些 Nginx 的相关命令，以便在开发和部署过程中进行配置、调试和维护。以下是一些比较常用的 Nginx 命令：

### 1. 启动和停止 Nginx 服务

启动 Nginx 服务：

```
sudo nginx
```

停止 Nginx 服务：

```
sudo nginx -s stop
```

重载 Nginx 配置文件：

```
sudo nginx -s reload
```

### 2. 查看 Nginx 进程情况

查看 Nginx 进程信息：

```
ps -ef | grep nginx
```

### 3. 查看 Nginx 配置文件

查看 Nginx 配置文件路径：

```
nginx -t
```

查看 Nginx 配置文件内容：

```
cat /etc/nginx/nginx.conf
```

### 4. 测试 Nginx 配置文件

测试 Nginx 配置文件中是否存在语法错误：

```
nginx -t
```

如果配置文件存在错误，会打印出错误信息。

### 5. 查看 Nginx 日志

查看 Nginx 错误日志：

```
tail -f /var/log/nginx/error.log
```

查看 Nginx 访问日志：

```
tail -f /var/log/nginx/access.log
```

以上是一些常用的 Nginx 命令，前端开发人员在使用 Nginx 进行开发和部署时，可以根据需要选择适当的命令进行配置和维护。 

### jq -r 是一个命令行工具的用法，它用于处理 JSON 数据。下面是对该命令的解释：

- jq 是一个轻量级的命令行 JSON 处理器。它允许你从 JSON 数据中提取、转换和操作数据。
- ```-r```是 jq 命令的一个选项，表示以原始输出模式（raw output mode）显示结果。默认情况下，jq 会将输出格式化为可读性更好的形式，但使用 -r 选项可以获取未经格式化的原始输出。
使用 jq -r 可以方便地从 JSON 数据中提取特定字段或进行其他操作，并以原始格式输出结果。
- 安装命令```brew install jq```
