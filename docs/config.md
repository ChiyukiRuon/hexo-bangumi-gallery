# 自定义配置项 <!-- {docsify-ignore} -->

填写在`_config.yml`文件中的配置参数。

## enable

是否启用插件

## path

!> `2.0.0` 版本后已弃用，详见 [path](/config?id=path-1)。

## api

可选择使用的番剧信息来源，可选`bgm`([Bangumi番组计划](https://bgm.tv/))或`mal`([MyAnimeList](https://myanimelist.net/))。

?> 使用MyAnimeList API获取番剧信息，需要提供API Key。

!> **注意：** 当使用MyAnimeList API获取番剧信息时，仅能使用`lite`模式。  
关于MyAnimeList API Key的限制，详见[为什么使用 MyAnimeList API 时不支持 full 模式？](/faq?id=为什么使用-myanimelist-api-时不支持-full-模式？)。

## api_key

对于选择`bgm`的用户来说，此参数可以忽略。若选择`mal`，则 **必须** 提供API Key。

?> 关于MyAnimeList API Key的获取，详见[帮助#获取MyAnimeList API Key](/help?id=获取myanimelist-api-key)。

## user_id

[Bangumi番组计划](https://bgm.tv/)或者[MyAnimeList](https://myanimelist.net/)的用户名，**不是昵称**。

## display

页面的显示设置

### title(v2.0.0+)

`display`参数  
页面的标题，默认为`我的时光机`。

### quote(v2.0.0+)

`display`参数  
页面的引言，会在页面顶部显示。删除此参数或留空将不显示。

### index

`display`参数  
页面首先展现的板块。`0`表示想看，`1`表示在看，`2`表示已看。默认为`1`。

### image_level

`display`参数  
图片质量，可选`l`(large), `c`(common), `m`(medium), `s`(small), `g`(grid)。默认为`l`。

?> MyAnimeList API仅支持`l`、`m`。在使用`mal`时，非`l`的图片质量将一律显示为`m`。

### size

`display`参数  
信息的显示模式，可选`lite`(lite mode)或`full`(full mode)。默认为`lite`。

?> 显示效果详见 [预览](/?id=预览)。

### name

`display`参数  
**仅在`lite`模式下有效**。是否显示名称。默认为`true`。

### margin

`display`参数  
每个元素之间的间隔，默认为`10`。  
在`lite`模式下为元素四周的间隔，在`full`模式下为元素上下的间隔。

### page_size

`display`参数  
每页展示的元素数量，默认为`24`。

### progress

`display`参数  
**仅在`full`模式下有效**。是否在`在看`页面展示追番进度。默认为`true`。

### lazyload(v1.1.0+)

`display`参数  
是否启用懒加载。 

如果想要自定义懒加载的占位图，可以直接替换`/source/bangumi-gallery/img/loading.gif`，替换的图片也必须是**gif格式**。如果想要恢复默认占位图，删除此文件即可。

!> **注意：** 插件版本为1.1.0以上才支持此参数。

## book、bangumi、music、game(v2.0.0+)

`2.0.0`版本后新增的板块配置，除了必须的 `enable` 和 `path` 参数外，其余配置项均继承 `display` 配置，如果板块中的配置项与基础配置项不同，则优先使用板块的配置项。

?> **MyAnimeList 仅支持 `book` 与 `bangumi` 板块。**

### enable

板块配置项，**必须**  
是否启用该板块。

### path

板块配置项，**必须**  
页面的路径，默认为各板块的名称，如`/book.html`、`/bangumi.html`。访问时可以去掉末尾的`.html`。

!> **注意：** 页面路径的设置必须以`.html`结尾。

## title

!> `2.0.0` 版本后已弃用，详见 [title](/config?id=titlev200)。

## quote

!> `2.0.0` 版本后已弃用，详见 [quote](/config?id=quotev200)。
