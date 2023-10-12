---
title: Nginx
date: 2023-3-30
tags:
  - Nginx
categories:
  - Nginx
---

### Nginx基础操作

##### 日志配置与查看

```javascript
// 配置
access_log on;
access_log logs/blog.access.log;
error_log  logs/blog.error.log;

// 查看
cd logs
tail -100 blog.access.log
tail -100 blog.error.log
```

##### 配置Nginx反向代理

```javascript
location ^~ /qihe/tile {
    access_log on;
    error_log  logs/qihe.error.log;
    access_log logs/qihe.access.log;
    proxy_pass https://qhythzhpt.citycloud.com.cn:8090/sgup/tile;
}
```

##### 配置静态资源

```javascript
location /sgup/7xcockpit/event/eventlatlon.json {
      alias   /usr/local/nginx/conf/projects/sgup/eventlatlon.json;
 }
```

##### 配置项目访问路径

```
location /coderdeh/blog {
       access_log logs/blog.access.log;
       access_log on;
       error_log  logs/blog.error.log;
       alias   /usr/local/nginx/conf/projects/deh/blog/public;
       index index.html;
  }
```

##### 基础操作

```javascript
// 切换路径
cd /usr/local/nginx/conf

// 编辑配置文件
vim nginx.conf

// 编辑  i

// 搜索  /

// 查看搜索的下一个    n

// 保存并退出   esc => : => wq

// 退出不保存  esc => : => q!

// 重启 切换到sbin文件夹下   ./nginx -s reload

// 检查配置文件  切换到sbin文件夹下   ./nginx -t
```

