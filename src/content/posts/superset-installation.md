---
title: "Superset 安装"
date: 2022-03-11
tags:
  - "技术"
photos:
  - "/photos/superset-installation/01-superset.jpg"
---

apache有许多顶级开源项目，这次看中一款BI软件。可以展示各种图表。

### 1.安装docker

本次采用docker安装模式，所以先安装docker[[可以参考这里](<https://iplay.codes/how-to-use-docker?ref=memore.cool>)]和compose（我此次使用apt install docker-compose命令安装）

### 2\. 克隆 Superset's Github仓库[​](<https://superset.apache.org/docs/installation/installing-superset-using-docker-compose?ref=memore.cool#2-clone-supersets-github-repository>)

使用下列命令在终端中，克隆Superset的仓库:
    
    
    $ git clone https://github.com/apache/superset.git

克隆成功后，会在当前文件夹下多一个 `superset` 子文件夹.

### 3\. 使用Docker Compose来运行[​](<https://superset.apache.org/docs/installation/installing-superset-using-docker-compose?ref=memore.cool#3-launch-superset-through-docker-compose>)

进入文件夹
    
    
    $ cd superset

运行下列命令:
    
    
    $ docker-compose -f docker-compose-non-dev.yml pull$ docker-compose -f docker-compose-non-dev.yml up

### 4\. 登录 Superset[​](<https://superset.apache.org/docs/installation/installing-superset-using-docker-compose?ref=memore.cool#4-log-in-to-superset>)

本地Superset实例包含了Postgres数据库，并且已经预加载了一些示例数据。

现在可以用浏览器打开 `http://localhost:8088`.

备注，现在有许多浏览器开始默认使用 `https` -请注意使用 `http`打开。

登录的用户名密码是
    
    
    username: admin
    password: admin
    
    
    备注：我自己的网络的网速还可以接受，全程针对网络做特殊处理。系统使用的是全新安装的Ubuntu 20.4.04 LTS。

全程安装过程中，网络畅通，并且无报错。个人按照上面的操作完成后即可运行。

参考官方地址：
