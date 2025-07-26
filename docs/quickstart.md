# 快速开始 <!-- {docsify-ignore} -->

## 安装

在博客的项目目录下，运行以下命令安装插件：

```shell
npm install hexo-bangumi-gallery --save
```

## 配置

### 基础配置

通过在博客的`_config.yml`文件中添加以下配置即可使用插件的基本功能：

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

### 进阶配置

在 `2.0.0` 版本后，插件提供了更多可展示的页面，包括 bgm.tv 中的书籍、游戏、音乐信息，以及 MyAnimeList 中的漫画列表。  
只需要按照以下配置修改即可：  

```yaml
bangumi_gallery:
  enable: true
  api: 'bgm'
  api_key: ''
  user_id: ''
  display:
    title: '我的时光机'
    quote: '你能和我看一辈子动画吗'
    index: 1
    image_level: 'l'
    size: 'full'
    name: true
    margin: 10
    page_size: 24
    progress: true
    lazyload: true
  book:     # 每个板块的配置
    enable: true
    path: /book.html
    title: '书籍'
  bangumi:
    enable: true
    path: /bangumi.html
    title: '追番'
    quote: '你能和我看一辈子动画吗'
  music:
    enable: true
    path: /music.html
    title: '音乐'
  game:
    enable: true
    path: /game.html
    title: '游戏'
    index: 2
```

每个板块都需要一个 `enable` 配置项，用于控制该板块是否启用。以及一个 `path` 配置项，用于指定该板块的路径。  
除此以外，每个板块的配置项与基础配置项 `display` 相同，如果板块中的配置项与基础配置项不同，则优先使用板块的配置项。

## 运行

正确填写配置文件后，运行server。初次运行时，插件会自动获取番剧信息并缓存到本地。  
获取完数据后，访问 `http://localhost:[port]/[path]` ，你应该就可以看到番剧墙页面了。  
如果要更新番剧数据，在博客项目目录下运行以下命令，番剧数据就会更新并缓存。

```shell
hexo bangumi-gallery -u
```
