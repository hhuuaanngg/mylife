---
title: "AdGuard Home安装和使用指北"
date: 2023-01-20
tags:
  - "技术"
photos:
  - "/photos/adguardhome/01-adguard-1-1.png"
  - "/photos/adguardhome/02-adguard-1.png"
  - "/photos/adguardhome/03-adguard-2.png"
  - "/photos/adguardhome/04-image-1-1.png"
  - "/photos/adguardhome/05-image-2-1.png"
  - "/photos/adguardhome/06-image-3-1.png"
---

### AdGuard Home 是什么？

简单说来，是个去广告和保护隐私的本地化开源的DNS服务。

在这个互联网上，很多公司都会取很多个人信息脱敏后进行大数据分析，来进行推送各种广告。也不排除有些灰色的做法，会拿取个人信息。

现在广告也越来越多，也有一些侵入式广告的出现。现在的电视都是所谓的智能电视和电视盒子，现在没有会员都得看广告，广告的时间那个叫长啊，没个两分钟那都算是良心的。如果不小心跳出，得重新看广告。

而AdGuardHome从流量侧面解决，只需要在网关上部署，即可以实现全局域网内的广告拦截和隐私保护。在DNS解析中，匹配规则库进行Url的拦截。配合在客户端中的插件，实现网页端的DOM拦截，实现浏览干净的网页。

### 安装环境

AdguardHome支持各种平台的安装。包括但不限于Windows、 Linux、FreeBS 、macOS、docker、软路由openwrt等等。

目前我使用docker安装方式。

### 安装过程

使用docker cli的命令安装。
    
    
    docker run --name adguardhome\    
    --restart unless-stopped\    
    -v /my/own/workdir:/opt/adguardhome/work\    
    -v /my/own/confdir:/opt/adguardhome/conf\    
    -p 53:53/tcp 
    -p 53:53/udp\    
    -p 67:67/udp 
    -p 68:68/udp\    
    -p 80:80/tcp 
    -p 443:443/tcp 
    -p 443:443/udp 
    -p 3000:3000/tcp\    
    -p 853:853/tcp\    
    -p 784:784/udp 
    -p 853:853/udp 
    -p 8853:8853/udp\    
    -p 5443:5443/tcp 
    -p 5443:5443/udp\    
    -d adguard/adguardhome

bridge网络模式下的安装命令

而我比较喜欢用独立的IP来安装dns服务，我在portainer中网络使用macvlan的方式安装，也就没有做这么多的端口映射。

### 初始化配置

首次打开，输入http://IP地址：3000 。

设置完成后，就用IP地址可以直接登陆了。

### 高级配置

#### DNS设置

输入多个上游DNS服务器地址，用于DNS解析。也就是说，最终用户是从这些DNS服务中去查询的

查询方式一般在 [负载均衡] [并行请求]，我自己测试后，发现“并行请求“速度就比较快，可以在10ms内解析。

我用的公共DNS地址：

8.8.8.8  
8.8.4.4  
119.29.29.29  
119.29.29.29  
https://doh.pub/dns-query  
https://dns.pub/dns-query  
tls://dot.pub  
223.5.5.5  
223.6.6.6  
https://dns.alidns.com/dns-query  
tls://dns.alidns.com  
114.114.115.115  
114.114.114.114

#### Bootstrap DNS 服务器

用来解析上游的DoH / DoT 解析器的 IP 地址。就比如用来解析上面我用的 https://dns.aliyun.com/dns-query 解析为IP地址。

也就是说，如果上游DNS没有DoH/DoT的地址，这里的用处不大了。

#### 私人反向DNS服务器

我理解为这个的用户，是可以解析内部局域网内的解析。比如内部有一个Windows AD域控制器和DNS服务器，那么这里写上内部DNS服务器的地址。专门用于解析内部地址。

但是实际情况，我发现并不会起作用。有知道的小伙伴可以分享一下使用的情况。

#### 速度限制

我一般设置为0，因为除了性能的瓶颈外，想不到有什么特殊场景需要限制。

#### DNS重写

这是一个比较有意思的功能。

可以把特定的网址解析到特定的IP地址。理论上和hosts改的方式一个回事，只不过这个地方不能被批量导入，如果可以的话，就可以解决一些特殊情况下的·番羽-弓虽·作用。另外一种使用场景，可以自定义内部的服务或电脑给定一个内部的域名地址，就比如上面的例子，在浏览器中输入 http://adguard.lan 就可以打开Ad GuardHome这个，记域名地址比记IP地址，可能更简单些吧，看起来也更有Bigger吧。😄
