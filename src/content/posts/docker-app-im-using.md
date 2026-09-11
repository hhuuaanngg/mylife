---
title: "我在用的Docker应用"
date: 2022-02-13
tags:
  - "技术"
photos:
  - "/photos/docker-app-im-using/01-docker-using.png"
  - "/photos/docker-app-im-using/02-docker-using-portainer-1.png"
  - "/photos/docker-app-im-using/03-plex1-1--1.png"
  - "/photos/docker-app-im-using/04-docker-using-jellyfin-1.png"
  - "/photos/docker-app-im-using/05-docker-using-adminer.png"
  - "/photos/docker-app-im-using/06-docker-using-adguardhome.png"
  - "/photos/docker-app-im-using/07-docker-using-nextcloud.png"
  - "/photos/docker-app-im-using/08-docker-using-radarr.png"
  - "/photos/docker-app-im-using/09-docker-using-jackett.png"
---

自己在用或者不错的Docker应用推介。

## Portainer

方便的GUI图形化操作Docker的docker应用。极大的方便添加管理应用。

## Heimdall

一个导航页面。（已经不再使用。）

## Plex

一个非常有名的媒体服务器

## Jellyfin

另一个非常有名的开源媒体服务器

## Watchtower

自动化更新docker应用。
    
    
    docker run -d \    --name watchtower \    -v /var/run/docker.sock:/var/run/docker.sock \    containrrr/watchtower

## Filebrowser

一个简洁方便的文件管理和分享

## Adminer

一个图形化管理数据库应用，完美的phpmyadmin的替代，支持MariaDB，MySQL，Postgress

## AdGuardHome

DNS服务器，支持去广告，保护隐私，自定义解析地址，自带去广告保护隐私规则，DHCP服务等。同类软件还有pihole。这个软件像个狗皮膏药，哪哪儿都能可以安装他，包括不限于各种商业NAS、开源NAS、树莓派、虚拟机等等等。

## Nextcloud

开源的网盘应用。支持各种终端的文件同步，分享。拥有强大的插件库。百度网盘强大的替代品。

## Grocy

家庭ERP，管理家里的里里外外，从做饭到资产，你家里的一切都能管理起来。这个软件对于有精力的人来说，可能是个不错的家庭管理好帮手吧。

## Sonarr

媒体自动化软件

## Radarr

也是媒体自动化软件

## Jekkett

看这个命名方式也不难猜到也是跟媒体自动化有关的软件。

## Home Assistant

智能家居的中心软件。用它可以让Apple的HomeKit识别小米等智能家居软件。

## 其他

### frp

内网穿透。我用的是snowdreamtech-ftps的docker镜像

### ddns解析

dnspod-ddns
