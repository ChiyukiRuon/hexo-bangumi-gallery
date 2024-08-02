# Quickstart <!-- {docsify-ignore} -->
## Install

In the blog project directory, run the following command to install the plugin:

```shell
npm install hexo-bangumi-gallery --save
```

## Configuration

Add the following configuration to the `_config.yml` file:

```yaml
# Bangumi gallery
    bangumi_gallery:
      enable: true      # whether enable
      path: /bangumi.html      # path of bangumi gallery page
      api: 'mal'      # choose 'bgm' or 'mal' for bangumi source
      api_key: ''     # Optional. api key of mal
      user_id: 'chiyukiruon'
      display:
        index: 1      # the index tab to display. 0:planToWatch, 1: watching, 2: completed
        image_level: 'l'      # l, c, m, s, g
        size: 'lite'     # 'lite' or 'full'
        name: true      # whether display bangumi name with lite mode
        margin: 10      # margin of bangumi item
        page_size: 24     # number of bangumi to display per page
        progress: true      # whether display progress in watching tab with full mode
      title: 'Bangumi'      # title of bangumi gallery page
      quote: 'Isshou bangumi shite kureru.'      # quote of bangumi gallery page
```

## Run

After add the configuration correctly, run the server. When running for the first time, the plugin will automatically fetch the anime information and cache it locally.  
After fetching the data, visit `http://localhost:4000/[path]` and you should be able to see the bangumi gallery page.  
If you want to update the anime data, run the following command in project directory, and the anime data will be updated and cached.  

```shell
hexo bangumi-gallery -u
```