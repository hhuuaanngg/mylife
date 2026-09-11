---
title: "frp安装与配置记录"
date: 2023-12-13
tags:
  - "技术"
photos:
  - "/photos/frp/01-Gemini_Generated_Image_mtgoi3mtgoi3mtgo.png"
---

事出有因。很久没有用frp了，安装在unraid了之后测试通之后就没怎么使用。最近遇到一个奇怪的现象，就在隔壁小县城，往回连移动的网络竟然网络无比卡顿，测试电信的网络很顺畅。这个就很难受了。

抽了点时间，打算做个备用frp，就把frp的使用略略略研究了一下。顺便把unRaid中的frp直接更新了一下，然后测试发现连不上了。查了一下，发现原来frp的新版本“从 v0.52.0 版本开始，frp 开始支持 TOML、YAML 和 JSON 作为配置文件格式。”

以下截图是在unRaid界面的配置。

frps.toml文件的配置信息，我用到有如下：
    
    
    bindAddr = "0.0.0.0" #可空
    bindPort = 17000 
    auth.method = "token" #可空
    auth.token = "1234567890" # 但写了token必须和客户端的配置一毛一样
    
    webServer.addr = "0.0.0.0"
    webServer.port = 7500
    # dashboard 用户名密码，可选，默认为空
    webServer.user = "admin"
    webServer.password = "admin"

客户端侧我用的配置如下：
    
    
    serverAddr = "112.43.23.2"
    serverPort = 17000
    auth.method = "token"
    auth.token = "1234567890" #必须和服务端的值一毛一样
    
    [[proxies]]
    name = "test-tcp" # 自定义一个名称
    type = "tcp" #类型，支持多种udp，stcp具体看官网
    localIP = "127.0.0.1" # 本地的地址，可以是局域网内的其他IP
    localPort = 3389 # 本地服务的端口号
    remotePort = 6000 # 映射到服务器的端口，你可以在服务器段映射到公网，这样的话方便了，但是安全性大大大的降低了。
    transport.useEncryption = true #加密，还有更多参数，可以参考官网
    transport.useCompression = true #压缩

在Windows的终端中，使用frpc.exe -c frpc.toml来运行客户端。
