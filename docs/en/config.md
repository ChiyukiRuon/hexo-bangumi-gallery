# Custom configuration <!-- {docsify-ignore} -->

The configuration fill in the `_config.yml` file.  

## enable

Whether to enable the plugin  

## path

The path of the anime list page, the default is `/bangumi.html`. You can remove the `.html` at the end when accessing.  

!> **NOTE:** The page path setting must end with `.html`.  

## api

You can choose the source of anime information to use, either `bgm` ([bgm.tv](https://bgm.tv/)) or `mal` ([MyAnimeList](https://myanimelist.net/)).  

?> To use MyAnimeList API, you need to provide an API Key.  

!> **NOTE:** When using the MyAnimeList API, only `lite` mode is available.  
For more information about the limitations of the MyAnimeList API Key, see [Why is full mode not supported when using the MyAnimeList API?](/en/faq?id=why-is-full-mode-not-supported-when-using-the-myanimelist-api).

## api_key

For users who choose `bgm`, this parameter can be ignored. If you choose `mal`, you **must provide** an API Key.  

?> For details, see [Help#Get MyAnimeList API Key](/en/help?id=get-myanimelist-api-key).    

## user_id

The username of [bgm.tv](https://bgm.tv/) or [MyAnimeList](https://myanimelist.net/). **NOT nickname**.  

## display

Display settings of anime list page

### index

`display` param  
Index of the anime list page. planToWatch: `0`, Watching: `1`, Completed: `2`. Default is `1`  

### image_level

`display` param  
The quality of the cover, optional: `l`(large), `c`(common), `m`(medium), `s`(small), `g`(grid). Default is `l`  

?> MyAnimeList API only supports `l` and `m`. When using `mal`, images other than `l` will be displayed as `m`.  

### size

`display` param  
The display mode of the anime list page. The value can be `lite` (lite mode) or `full` (full mode). The default is `lite`  

?> See [Preview](/en/?id=preview)

### name

`display` param  
**Only valid in `lite` mode**. Whether to display the title of the anime. Default is `true`  

### margin

`display` param  
The default interval between each anime is `10`.    
In `lite` mode, it is the interval around the anime, and in `full` mode, it is the interval above and below the anime.  

### page_size

`display` param  
The number of anime displayed per page. `24` by default.

### progress

`display` param  
**Only valid in `full` mode**. Whether to display the progress of the anime in `Watching` tab. Default is `true`.  

## title

The title of the anime list page. The default is "Bangumi".

## quote

Will be displayed at the top of the page. Delete this parameter or leave it blank to avoid displaying.  