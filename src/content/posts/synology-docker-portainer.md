---
title: "群晖Docker安装portainer"
date: 2023-01-16
tags:
  - "技术"
photos:
  - "/photos/synology-docker-portainer/01-AI-generated-2.jpeg"
  - "/photos/synology-docker-portainer/02-synology-docker-setup1.png"
  - "/photos/synology-docker-portainer/03-synology-docker-setup2.png"
  - "/photos/synology-docker-portainer/04-synology-docker-setup3.png"
---

由于觉得群晖默认的docker交互不是很好，功能也相对可配置的功能也相对简单，所以之前安装都是在专门新建一个虚拟机作为docker服务器。

今天折腾的时候突然想到，既然要玩portainer，那再群晖的docker中安装一个portainer不就得了。说干就干。

### 首先，需要开启ssh功能。

开启方式如图所示。在“控制面版”-“终端机和SNMP”启动SSH服务。会有一个安全提示，确认即可。

开启ssh的具体位置

### 可选操作：更改docker镜像地址

我使用的是163的镜像地址。注册表镜像URL填写为`https://hub-mirror.c.163.com`

并且保证和图片中的设置一样即可，点击保存。即可启用docker镜像加速。阿里云也有，可以注册账号申请一个专属加速地址。

### 安装portainer

首先进入ssh

使用命令 sudo -i 切换到root账号

使用命令安装portainer，等待安装完成即可。

后续的操作就和普通portainer设置一摸一样了。具体可以参考以下链接。
