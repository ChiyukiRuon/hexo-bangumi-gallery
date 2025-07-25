# Hexo Bangumi Gallery

[简体中文](https://github.com/ChiyukiRuon/hexo-bangumi-gallery/blob/main/README.md) | English

A Hexo plugin, show your anime list in your blog. Support to get anime information from [bgm.tv](https://bgm.tv/) and [MyAnimeList](https://myanimelist.net/).

## Preview

There are two styles to choose for display. In `lite` mode, only the cover and *title (optional)* are displayed, while in `full` mode, more anime information will be displayed.

### lite mode

In `lite` mode, only the cover and title of the anime displayed. You can also choose to display only the cover.  
You can also configure the interval between anime and the number of anime displayed per page in the configuration file. This is described in detail in the configuration section below.
![lite mode with title displayed](https://bgmgallery.chiyukiruon.com/images/lite_mode_en_1.png "lite mode with title displayed")

### full mode

In `full` mode, in addition to the cover and title, it will also display information such as introduction, number of episodes, ratings, air date, etc.
![full mode](https://bgmgallery.chiyukiruon.com/images/full_mode_en_2.png "full mode")

For the anime you are watching, you can choose whether to display the current progress in the anime information.
![display progress in watching tab with full mode](https://bgmgallery.chiyukiruon.com/images/full_mode_en_1.png "display progress in watching tab with full mode")  
**ATTENTION: Due to the MyAnimeList API, you need to provide API Key when using MyAnimeList API to fetch anime information.
And when using MyAnimeList API to fetch anime information, you can only use `lite` mode.**

## Quick start
1. Install the plugin  
   In the blog project directory, run the following command to install the plugin:
    ```shell
   npm install hexo-bangumi-gallery --save
   ```
   
2. Basic Configuration
   Add the following configuration to the `_config.yml` file:
   ```yaml
    # Bangumi gallery
    bangumi_gallery:
      enable: true      # whether enable
      api: 'mal'      # choose 'bgm' or 'mal' for bangumi source
      api_key: ''     # Optional. api key of mal
      user_id: ''     # your bangumi or mal user id
      display:
        title: 'Bangumi'      # title of the page
        quote: 'Isshou bangumi shite kureru.'      # quote of the page
        index: 1      # the index tab to display. 0: planToDo, 1: doing, 2: completed
        image_level: 'l'      # l, c, m, s, g
        size: 'lite'     # 'lite' or 'full'
        name: true      # whether display bangumi name with lite mode
        margin: 10      # margin between items
        page_size: 24     # number of items to display per page
        progress: true      # whether display progress in doing tab with full mode
        lazyload: true    # whether lazy load images
      bangumi:
        enable: true     # enable bangumi section
        path: /bangumi.html     # path of bangumi section
   ```

   > For advanced configuration, please refer to: https://bgmgallery.chiyukiruon.com/#/en/

3. Run

   After add the configuration correctly, run the server. When running for the first time, the plugin will automatically fetch the anime information and cache it locally.  
   After fetching the data, visit `http://localhost:[port]/[path]` and you should be able to see the bangumi gallery page.  
   If you want to update the anime data, run the following command in project directory, and the anime data will be updated and cached.
    ```shell
   hexo bangumi-gallery -u
   ```
   
## Thanks
- [Hexo](https://hexo.io/)
- [hexo-bangumis](https://github.com/mmdjiji/hexo-bangumis)
- [Bangumi API](https://bangumi.github.io/api/#/)
- [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2)

## LICENSE
[MIT](https://github.com/ChiyukiRuon/hexo-bangumi-gallery/blob/main/LICENSE)
