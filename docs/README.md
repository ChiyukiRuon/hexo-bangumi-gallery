## 简介

这是一个适用于 Hexo 的番剧墙插件。它可以在你的博客中展示你的追番，包括想看、在看和已看的番剧。支持从[Bangumi番组计划](https://bgm.tv/)和[MyAnimeList](https://myanimelist.net/)获取番剧信息。

## 预览

番剧墙有两种样式可选，`lite`模式下只显示番剧封面和*番剧名称(可选)*，`full`模式下会显示更多番剧信息。

### lite 模式

`lite` 模式下番剧仅显示番剧封面和番剧名称  
你可以在配置文件中配置番剧间的间隔以及每页显示的番剧数量。这在后面的配置部分中有详细的介绍。  
![lite 模式(显示番剧名称)](/images/lite_mode_zh_cn_1.png "lite 模式(显示番剧名称)")  

你也可以选择只显示番剧封面。  
![lite 模式(不显示番剧名称)](/images/lite_mode.png "lite 模式(不显示番剧名称)")  

### full 模式

`full` 模式下除了番剧封面和番剧名称外，还会显示番剧简介、集数、评分、放送日期等信息。  
![full 模式](/images/full_mode_zh_cn_2.png "full 模式")  
对于在看的番剧，你可以选择是否在番剧信息中显示当前追番进度。  
![full 模式下展示追番进度](/images/full_mode_zh_cn_1.png "full 模式下展示追番进度")  

!> **注意：** 使用MyAnimeList API获取番剧信息，需要提供API Key。并且由于MyAnimeList API限制，当使用MyAnimeList API时，仅能使用`lite`模式。