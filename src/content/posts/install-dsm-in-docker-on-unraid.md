---
title: "unRaid的docker中安装群晖DSM"
date: 2023-12-13
tags:
  - "技术"
photos:
  - "/photos/install-dsm-in-docker-on-unraid/01-image-2.png"
---

docker可以安装群晖的DSM了，一开始看到这个文章的时候，很是惊喜。心想可以把群晖DSM中的文件通过docker直接映射在unraid的文件夹中，那管理起来可谓是无比的方便。一个文件被两个系统使用。但后来转念一想，可能逻辑上是不太行的，如果这样的话，可能权限是无法控制的。这么猜想，但也无法验证。作罢。

毕竟需求是创造出来的，过了几天便创造了个需求。用这个docker群晖来备份白群晖。那就干呗。

绕过各种弯子，直接贴图告诉你我是怎么做的。

其中几个点强调一下：
    
    
    Extra Parameters:--cap-add NET_ADMIN --device-cgroup-rule='c 243:* rwm' --device=/dev/vhost-net

这个代码呢，device的两个呢，是看console界面中的错误提示，加进去的。但这个内容官方的docker页面有说明。详细[看这里](<https://hub.docker.com/r/vdsm/virtual-dsm?ref=memore.cool#:~:text=How%20can%20the%20container%20acquire%20an%20IP%20address%20from%20my%20router%3F>)。

第二个小说明：

截图中，我添加了两个磁盘。这个就看你自己的需要了。官方文档说明，可以磁盘修改大小的。

最后，一个最最最最重要的点，我一直是想用独立IP，不是bridge模式。一直失败。后来查了好久好久的Google才发现，原来unraid是可以换docker的网卡模式的。默认是ipvlan，我把他改成macvlan模式，就解决啦。

## 洗白

原本以为virtual dsm不用洗白，结果还是逃不过。

遇到问题了。我想用这个群晖来备份白群晖里的数据的。但是ABB（ActiveBackup for Business）需要激活后才能使用，用以上方式安装的群晖序列号显示全是零，固然不能激活ABB。

找了又找，终于找到了方法：（[来源](<https://github.com/vdsm/virtual-dsm/issues/266?ref=memore.cool>)）

在docker中添加如下参数即可。
    
    
    MAC (valid VirtualDSM MAC address)mac地址中间用横杠区隔
    GUEST_SERIAL (valid VirtualDSM serial)
    HOST_SERIAL (valid serial of your DSM NAS)
    
    To activate Advanced Media Extensions on v7.2 and higher you must additionally set:
    
    HOST_MAC (valid MAC of your DSM NAS)
    HOST_MODEL (correct modelname of your NAS, for example: DS220+)

至于以上的序列号和mac地址怎么来呢。。Google一下吧，还是很多方法的 。

另外的虚拟dsm的序列号和mac地址么。。我懒的找了。直接拷贝了我白群晖里的虚拟dsm序列号和mac地址。不好意思了。哈哈哈

注册白白的序列号是如下的截图提示。
