# Hexo Bangumi Gallery

简体中文 | [English](https://github.com/ChiyukiRuon/hexo-bangumi-gallery/blob/main/README_EN.md)

Hexo番剧墙插件，在你的博客中展示你的追番。支持从 [Bangumi番组计划](https://bgm.tv/) 和 [MyAnimeList](https://myanimelist.net/) 获取番剧信息。

[![](https://nodei.co/npm/hexo-bangumi-gallery.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/hexo-bangumi-gallery)

## 预览
番剧墙有两种样式可选，`lite`模式下只显示番剧封面和*番剧名称(可选)*，`full`模式下会显示更多番剧信息。

### lite 模式

`lite` 模式下番剧仅显示番剧封面和番剧名称，你也可以选择只显示番剧封面。  
你也可以在配置文件中配置番剧间的间隔以及每页显示的番剧数量。这在后面的配置部分中有详细的介绍。
![lite 模式(显示番剧名称)](https://bgmgallery.chiyukiruon.com/images/lite_mode_zh_cn_1.png "lite 模式(显示番剧名称)")

### full 模式

`full` 模式下除了番剧封面和番剧名称外，还会显示番剧简介、集数、评分、放送日期等信息。 
![full 模式](https://bgmgallery.chiyukiruon.com/images/full_mode_zh_cn_2.png "full 模式")  
对于在看的番剧，你可以选择是否在番剧信息中显示当前追番进度。
![full 模式下展示追番进度](https://bgmgallery.chiyukiruon.com/images/full_mode_zh_cn_1.png "full 模式下展示追番进度")  

**注意：由于MyAnimeList API限制，使用MyAnimeList API获取番剧信息时，需要提供API Key。
并且当使用MyAnimeList API获取番剧信息时，仅能使用`lite`模式。**

## 快速开始

1. 安装插件

   在博客的项目目录下，运行以下命令安装插件：
    ```shell
   npm install hexo-bangumi-gallery --save
   ```
2. 基础配置

    在博客的`_config.yml`文件中添加以下配置：
    ```yaml
    # Bangumi gallery
    bangumi_gallery:
      enable: true      # 是否启用插件
      api: 'bgm'      # 使用哪一个 API 获取番剧信息，可选 bgm(Bangumi番组计划) 或 mal(MyAnimeList)
      api_key: ''     # 可选，仅当使用 MyAnimeList API 获取番剧信息时需要提供
      user_id: ''     # 你的 Bangumi 或 MyAnimeList 用户 ID
      display:
        title: '追番'      # 页面的标题
        quote: '你能和我看一辈子动画吗'      # 可以用来玩梗（
        index: 1      # 页面首先展示的板块。1想看，2在看，3已看
        image_level: 'l'      # 番剧封面质量，可选l, c, m, s, g
        size: 'lite'     # lite 或 full 模式
        name: true      # 在 lite 模式下，是否显示番剧名称
        margin: 10      # 每个元素之间的间隔
        page_size: 24     # 每页展示的元素数量
        progress: true      # 是否在 full 模式下的在看页面展示进度
        lazyload: true    # 是否启用图片懒加载
      bangumi:
        enable: true     # 启用番剧板块
        path: /bangumi.html     # 番剧板块路径
    ```

    > 进阶配置详见文档：https://bgmgallery.chiyukiruon.com/

3. 运行  

    正确填写配置文件后，运行server。初次运行时，插件会自动获取番剧信息并缓存到本地。  
    获取完数据后，访问 `http://localhost:[port]/[path]` 应该就能看到番剧墙页面了。  
    如果要更新番剧数据，在博客项目目录下运行以下命令，番剧数据就会更新并缓存。
    ```shell
   hexo bangumi-gallery -u
   ```
   
## 鸣谢
- [Hexo](https://hexo.io/)
- [hexo-bangumis](https://github.com/mmdjiji/hexo-bangumis)
- [Bangumi API](https://bangumi.github.io/api/#/)
- [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2)

## LICENSE
[MIT](https://github.com/ChiyukiRuon/hexo-bangumi-gallery/blob/main/LICENSE)
