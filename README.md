## oh-my-dimmer
>👋 chrome扩展程序，暗黑模式一键切换。chrome扩展商店搜「关灯」
<div style='display: flex;align-items: center;justify-content: center;'><img width='600px' src='https://i.loli.net/2020/12/07/XRlEvnZ6pBchHtT.png' style='border: 1px solid #666;' alt='example'/></div>

## 介绍  
迫于晚上看网页太亮，本人还有干眼症！就想做一个网页扩展使用。   

上网了解了下，发现有个非常简单的属性可以操作，主要使用`css3`的`filter`滤镜属性`invert(1) hue-rotate(180deg)`来实现，`invert`控制页面元素颜色反转，默认值是`0`，完全反转是`1`，`hue-rotate`用于给图片设置颜色反转，`0`是无变化，`180deg`是完全反转，超过`360deg`的值相当于又绕一圈。也算是复习一下chrome扩展相关知识并学习一下sketch软件。花了一天时候做出来，由于扩展清单文件使用了`<all_urls>`权限，发到扩展商店审核花了五天左右。   
 
关灯这个名字来自`v2ex`的`@chocovon`的创意，非常感谢。
## 资源

- [谷歌商店安装](https://chrome.google.com/webstore/detail/%E5%85%B3%E7%81%AF/dnidbhhpcjgffjophhebfelbcnonoclh?hl=zh-CN) 
- [国内镜像安装](https://www.chromefor.com/%e5%85%b3%e7%81%af_v1-0-0/)

## 版本

- v1.0.0
 1. 发布
 
- v1.0.1
 1. 调整并优化操作界面
 2. 去除调试代码

