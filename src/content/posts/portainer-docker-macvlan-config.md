---
title: "Portainer添加macvlan网络设置"
date: 2022-02-25
tags:
  - "技术"
photos:
  - "/photos/portainer-docker-macvlan-config/01-portainer-macvlan-1-1.png"
  - "/photos/portainer-docker-macvlan-config/02-portainer-macvlan-1.png"
  - "/photos/portainer-docker-macvlan-config/03-portainer-macvlan-2.png"
  - "/photos/portainer-docker-macvlan-config/04-portainer-macvlan-3.png"
---

## 一、添加Macvlan

在portainer中添加macvlan操作稍微多了一个步骤。

首先在Network中单击Add network

Name：取个名字

Drive：驱动选择macvlan

Parent Network Card：桥接的网卡名字，这个可以在Linux的控制台使用ip addr命令查看到。

Subnet：输入需要设置的网段。和docker宿主机的网关一致。

Gateway：输入网关，和docker宿主机的网关一致。

IP Range：可以不设置，如果自动获取的话，但要注意IP冲突。一般我都会在创建docker应用时手动指定IP。

还没有真正创建完成哦，再次点击第一截图中的Add Network。

Name 和 Drive的选择如上一步骤，配置选择Creation

配置Configuration选择之前配置的。

💡

注意： 在选择网卡的时候，要选择第二步中创建的网卡。以我为例：要选择myMacvlan3，而不是Macvlan3。

## 二、代码添加macvlan

1 首先使用 `docker network create` 分别在两台主机上创建两个 macvlan 网络：
    
    
    root@ubuntu:~# docker network create -d macvlan --subnet=192.168.2.0/24 --gateway=192.168.2.1 -o parent=ens18 myMacvlan3

这条命令中，

  * `-d` 指定 Docker 网络 driver
  * `--subnet` 指定 macvlan 网络所在的网络
  * `--gateway` 指定网关
  * `-o parent` 指定用来分配 macvlan 网络的物理网卡
  * 最后的myMaclvlan3是自定义的名字

之后可以看到当前主机的网络环境，其中出现了 macvlan 网络：
    
    
    admin@docker002:~$ sudo docker network lsNETWORK ID     NAME         DRIVER    SCOPEb915803b2048   bridge       bridge    local20456b754cfe   host         host      local3326de9edf0e   myMacvlan3   macvlan   localc21b1d7335c6   none         null      local
