---
title: "Ubuntu搭建Apache网站服务器"
date: 2020-02-10
tags:
  - "技术"
photos:
  - "/photos/install-lamp-quickly-on-ubuntu/01-apache-virtualhost-config.png"
---

## 1.Ubuntu快速安装LAMP

玩PHP可以在Windows、MacOS、Ubuntu、CentOS等多种平台上安装使用。但在Linux上安装总归最合适。

今天就分享一个在Ubuntu上快速安装LAMP的方式，并加上简单配置。

### 操作环境说明

操作系统：Ubuntu 18.04.1（理论上通吃所有Ubuntu版本）

### 操作步骤

快速安装执行一下代码即可
    
    
    sudo apt-get install lamp-server^ 

在浏览器里输入[http://localhost] 或者是[http://127.0.0.1]，如果看到了Apache2的介绍页面（包括安装位置和其他信息），那就说明Apache就成功的安装了，Apache的默认安装，会在/var下建立一个名为www的目录，这个就是Web目录了。其中，默认的这个介绍页面是放在www/html文件夹里。

初始页面，安装成功。

## 2.MySQL5.7安装后设置账号密码

新版的MySQL安装过程中不会再让用户配置账号密码等其他相关信息，导致安装完成后没有无法登录的情况。

使用mysql命令“mysql -u root”登录会报错：

ERROR 1045 (28000): Access denied for user ‘root’@’localhost’ (using password: NO)

然后你用“mysql – u root -p”还会报错

ERROR 1045 (28000): Access denied for user ‘root’@’localhost’ (using password: YES)

下面我们就详细说明一下，采用Ubuntu默认源安装的MySQL Server配置登录管理员账号的方法。

### 教程环境说明

  * 服务器版本：Ubuntu 18.4.1 LTS
  * MySQL：5.7
  * 环境：本地vm搭建

### 具体操作

（此处只讲MYSQL安装，如果需要Apache、PHP等lamp安装，请看本站其他文章）安装MySQL方法：
    
    
    sudo apt install mysql-server

随后执行：
    
    
    sudo mysql_secure_installation 

**注意** ， _一定要用sudo命令。_
    
    
    danny@ubuntuserver1804:~$ sudo mysql_secure_installation
    Securing the MySQL server deployment.Connecting to MySQL using a blank password.
    VALIDATE PASSWORD PLUGIN can be used to test passwordsand improve security. 
    It checks the strength of passwordand allows the users to set only those passwords which aresecure enough. 
    Would you like to setup VALIDATE PASSWORD plugin?
    #询问你是否需要安装密码验证插件，此处我选择no
    Press y|Y for Yes, any other key for No: 
    Please set the password for root here.#随即让你设置root新密码，输入两遍
    New password:Re-enter new password:
    By default, a MySQL installation has an anonymous user,allowing anyone to log into MySQL without having to havea user account created for them. 
    This is intended only fortesting, and to make the installation go a bit smoother.You should remove them before moving into a productionenvironment.
    #询问是否删除匿名用户。强烈推荐删除yRemove anonymous users? (Press y|Y for Yes, any other key for No) : y
    Success.#接着，询问你是否需要关闭远程连接。一般使用场景中都会关闭。除非你在两个服务器直接公用一个MySQL。此处建议输入y
    Normally, root should only be allowed to connect from'localhost'. This ensures that someone cannot guess atthe root password from the network.Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
    Success.By default, MySQL comes with a database named 'test' thatanyone can access. 
    This is also intended only for testing,and should be removed before moving into a productionenvironment.#询问是否删除测试数据库
    Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
    - Dropping test database...Success.
    - Removing privileges on test database...Success.
    Reloading the privilege tables will ensure that all changesmade so far will take effect immediately.#询问是否重新加载，输入y
    Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
    Success.All done!

到此，完成了MySQL的安全配置。但是，你直接用命令mysql -u root -p还是会提示登录错误ERROR 1698 (28000): Access denied for user ‘root’@’localhost’。如下，
    
    
    danny@ubuntuserver1804:~$ mysql -u root -pEnter password:ERROR 1698 (28000): Access denied for user 'root'@'localhost'

看好下一步，其实很简单，只要加上sudo命令就可以了
    
    
    danny@ubuntuserver1804:~$ sudo mysql -u root -pEnter password:Welcome to the MySQL monitor.  Commands end with ; or \g.Your MySQL connection id is 10Server version: 5.7.29-0ubuntu0.18.04.1 (Ubuntu)Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.Oracle is a registered trademark of Oracle Corporation and/or itsaffiliates. Other names may be trademarks of their respectiveowners.Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.mysql> 

虽然可以登录了，但是如果安装Wordpress等系统时还是不能使用。为什么呢？那是因为在数据库中，还是不允许账号密码登录。我们紧接着在mysql命令下输入
    
    
    mysql>SELECT user,authentication_string,plugin,host FROM mysql.user;

可以看到root只能socket方式登录

从Mysql8.0开始，可以使用一种比较安全的方式，或者说比较标准的方式处理这个问题：创建用户。

**创建用户**
    
    
    create user 'manager'@'localhost' identified by '‘密码';flush privileges;#刷新权限

> 其中localhost指本地才可连接  
> 可以将其换成%指任意ip都能连接  
> 也可以指定ip连接

**修改密码**
    
    
    Alter user 'test1'@'localhost' identified by '新密码';flush privileges;

**授权**
    
    
    grant all privileges on *.* to 'manager'@'localhost' with grant option;

with gran option表示该用户可给其它用户赋予权限，但不可能超过该用户已有的权限

比如a用户有select,insert权限，也可给其它用户赋权，但它不可能给其它用户赋delete权限，除了select,insert以外的都不能

这句话可加可不加，视情况而定。

all privileges 可换成select,update,insert,delete,drop,create等操作

`如：grant select,insert,update,delete on *.* to 'manager'@'localhost';`

第一个*表示通配数据库，可指定新建用户只可操作的数据库

如：grant all privileges on 数据库.* to ‘test1’@’localhost’;

第二个*表示通配表，可指定新建用户只可操作的数据库下的某个表

如：grant all privileges on 数据库.指定表名 to ‘test1’@’localhost’;

**查看用户授权信息**
    
    
    show grants for 'manager'@'localhost';

**撤销权限**
    
    
    revoke all privileges on *.* from 'manager'@'localhost';

用户有什么权限就撤什么权限

**删除用户**
    
    
    drop user 'manager'@'localhost';

~~那我们用update更新它：~~
    
    
    UPDATE mysql.user SET plugin="mysql_native_password", authentication_string=PASSWORD("你的新密码") WHERE user="root";

~~此处一定要记得改plugin的值为 mysql_native_password~~

**~~最后还要刷新一下权限。~~**
    
    
    mysql>FLUSH PRIVILEGES; 

OK。就此完全搞定。就此，你可以安装Wordpress等开源系统了。
