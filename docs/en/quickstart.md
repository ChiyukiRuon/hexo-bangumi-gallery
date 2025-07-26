# Quickstart <!-- {docsify-ignore} -->
## Install

In the blog project directory, run the following command to install the plugin:

```shell
npm install hexo-bangumi-gallery --save
```

## Configuration

### Basic

Add the following configuration to the `_config.yml` file:

```yaml
# Bangumi gallery
    bangumi_gallery:
      enable: true      # whether enable plugin
      api: 'mal'      # choose 'bgm' or 'mal' for datasource
      api_key: ''     # Optional. api key of mal
      user_id: 'chiyukiruon'
      display:
        title: 'Bangumi'      # title of bangumi gallery page
        quote: 'Isshou bangumi shite kureru.'      # quote of bangumi gallery page
        index: 1      # the index tab to display. 0:planToWatch, 1: watching, 2: completed
        image_level: 'l'      # l, c, m, s, g
        size: 'lite'     # 'lite' or 'full'
        name: true      # whether display item name with lite mode
        margin: 10      # margin of the item
        page_size: 24     # number of items to display per page
        progress: true      # whether display progress in watching tab with full mode
        lazyload: true    # whether lazy load images
      bangumi:
        enable: true     # whether enable bangumi module
        path: /bangumi.html      # path of bangumi gallery page
```

### Advanced

In `2.0.0` version, the plugin provides more displayable pages, including books, games, music information, and MyAnimeList's manga list.  
Just fill in the configuration as follows:

```yaml
bangumi_gallery:
  enable: true
  api: 'bgm'
  api_key: ''
  user_id: ''
  display:
    title: 'My List'
    quote: 'Isshou bangumi shite kureru.'
    index: 1
    image_level: 'l'
    size: 'full'
    name: true
    margin: 10
    page_size: 24
    progress: true
    lazyload: true
  book:     # each module's configuration
    enable: true
    path: /book.html
    title: 'Book'
  bangumi:
    enable: true
    path: /bangumi.html
    title: 'Bangumi'
    quote: 'Isshou bangumi shite kureru.'
  music:
    enable: true
    path: /music.html
    title: 'Music'
  game:
    enable: true
    path: /game.html
    title: 'Game'
    index: 2
```

Each module has its own configuration, which is the same as the basic configuration. If the configuration items of the module are different from the basic configuration, the module's configuration items will be used.  
The `enable` parameter is used to control whether to enable the module. The `path` parameter is used to specify the path of the module.  

## Run

After add the configuration correctly, run the server. When running for the first time, the plugin will automatically fetch the anime information and cache it locally.  
After fetching the data, visit `http://localhost:[port]/[path]` and you should be able to see the bangumi gallery page.  
If you want to update the anime data, run the following command in project directory, and the anime data will be updated and cached.  

```shell
hexo bangumi-gallery -u
```
