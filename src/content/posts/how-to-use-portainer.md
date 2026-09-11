---
title: "Portainer图形化容器管理器使用"
date: 2022-02-10
tags:
  - "技术"
photos:
  - "/photos/how-to-use-portainer/01-Gemini_Generated_Image_g3q4gxg3q4gxg3q4.png"
  - "/photos/how-to-use-portainer/02-2023-01-16-221253.png"
  - "/photos/how-to-use-portainer/03-portainer-step2.png"
  - "/photos/how-to-use-portainer/04-portainer-step3.png"
  - "/photos/how-to-use-portainer/05-portainer-step4.png"
  - "/photos/how-to-use-portainer/06-portainer-step5.png"
---

在上篇讲到安装好Docker后，紧接着使用如下命令就可以安装portainer了。
    
    
    sudo docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /home/docker/portainer:/data --name portainer --restart=always portainer/portainer-ce

等待拉去并运行，输入主机IP:9000打开页面，首次打开需要创建用户密码；

设置账号密码

选择Get Started默认就会添加本地的Docker服务了。

随即就可看到本地的服务状态，单击它，看到当前的汇总状态。

汇总信息：目前一共有多少个容器，镜像数量，卷数量和网络的数量。

单击进入添加镜像页面。

建议英文版，对应的名称会和命令行比较能对应的起来。

Name：对应命令参数[--name]，给你要创建的容器取个名字。

Registry：从哪个地方去下载镜像，可以管理界面配置额外的地址，比如腾讯镜像阿里镜像

Image：拉取的镜像名字，点击后面的Serach按钮，可以直接按照输入框内的内容搜索并打开hub.docker.com

Publish all exposed network ports to random host ports：[对应命令参数-p]自动产生对应端口。如果是默认的桥接模式的话，会自动产生对应端口。如果采用macvlan的驱动模式，这个就会不起效果了。

Manual network port publishing：[对应命令参数-p]手动映射端口，把容器内的80端口号映射到主机上的8080端口。同样，如果是macvlan网络驱动下，就不需要使用这个功能。

使用了上面的几个参数，就可以启动一个基本容器了。

Volume：[对应命令参数 -v]，希望哪些文件能够持久化保存，也就是说，在停止或删除的时候数据继续保存，或者升级docker应用后继续保存。

Bind：可是设置映射到主机的某个文件夹中。具体参考图片。

Network[对应命令参数--network XXXX] IPv4[对应命令参数 --ip X.X.X.X]，在此处设置可以固定IP地址，不设置就会自动分配。

Env环境变量[对应参数-e 或--env]。怎么看需要配置哪些参数呢？默认会带出参数，另外某些特定的参数就需要查看相应docker的说明了，比如截图中的flarum应用，需要制定数据库，用户名等信息。

重启策略[对应命令--restart]

no 默认值: 表示容器退出时，docker不自动重启容器；

on-failure: 若容器的退出状态非0，则docker自动重启容器，命令行还可以指定重启次数，若超过指定次数未能启动容器则放弃；

always: 容器退出时总是重启；

unless-stopped: 容器退出时总是重启，但不考虑Docker守护进程启动时就已经停止的容器。如果容器启动时没有设置–restart参数，则通过下面命令进行更新
