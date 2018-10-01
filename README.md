# jquery.gallery.plugin


## Instalation

Put into console

```bash
bower install
```

## Usage
Put into the head section 
```html
        <link rel="stylesheet" type="text/css" href="gal.style.css" />
        <script type="text/javascript" src="vendor/jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.gal.js"></script>
        <script type="text/javascript" src="libs.js"></script>
        <script type="text/javascript" src="script.js"></script>
```

Insert div which is intended as container of images :

```html

 <div id="scene">
</div>

```

On the other hand put

```html
<ul id="gal_list">drop an image here</ul>
```
for the list where you can drop an enlarged image (which is stored as a name of the file, but it can be easily
used in some different way by using sessionStorage item named imgList). 

To init gallery, put in script.js the following command:


```javascript

$(document).ready(function(){
    
    $('div#scene').gal(options);
    
});
    
```

where options is an object containing the field nrOfImgs which indicates 
the number of images and imagesDir - path to the images.


or with parameters (which can contain objects as values):
```javascript

$(document).ready(function(){
    
    $('div#scene').gal({"nrOfImgs": 4,"imagesDir" : "img/gallery/","mouseOut":{"opacity":.1}});
    
    
});
    
```


