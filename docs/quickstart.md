# 快速开始 <!-- {docsify-ignore} -->

## 安装

在博客的项目目录下，运行以下命令安装插件：

```shell
npm install hexo-bangumi-gallery --save
```

## 配置

在博客的`_config.yml`文件中添加以下配置：

```yaml
# Bangumi gallery
bangumi_gallery:
  enable: true      # 是否启用插件
  path: /bangumi.html      # 番剧墙页面的路径
  api: 'bgm'      # 使用哪一个API获取番剧信息，可选bgm(Bangumi番组计划)或mal(MyAnimeList)
  api_key: ''     # 可选，仅当使用MyAnimeList API获取番剧信息时需要提供
  user_id: ''     # 你的Bangumi或MyAnimeList用户id
  display:
    index: 1      # 番剧墙页面首先展示的板块。1想看，2在看，3已看
    image_level: 'l'      # 番剧封面质量，可选l, c, m, s, g
    size: 'lite'     # lite 或 full 模式
    name: true      # 在 lite 模式下，是否显示番剧名称
    margin: 10      # 每个番剧之间的间隔
    page_size: 24     # 每页展示的番剧数量
    progress: true      # 是否在 full 模式下的在看页面展示追番进度
    lazyload: true    # 是否启用懒加载
  title: '追番'      # 番剧墙页面的标题
  quote: '你能和我看一辈子动画吗'      # 可以用来玩梗（
```

## 运行

正确填写配置文件后，运行server。初次运行时，插件会自动获取番剧信息并缓存到本地。  
获取完数据后，访问 `http://localhost:4000/[path]` ，你应该就可以看到番剧墙页面了。  
如果要更新番剧数据，在博客项目目录下运行以下命令，番剧数据就会更新并缓存。

```shell
hexo bangumi-gallery -u
```