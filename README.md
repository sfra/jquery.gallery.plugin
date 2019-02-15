# jquery.gallery.plugin
# Preview of the developer version
[jquery.gallery.plugin](http://frankyy.eu5.org/projects/jquery.gallery.plugin/)

## Instalation

Put into console

```bash
bower install
```
The above command will install jquery dependency. Obviously you can use your own file of jquery.

## Usage
Copy files  dist/jquery.gal.min.js dist/gal.style.min.css into the appropriate place of your web page.
Put into the head section 
```html
            <link rel="stylesheet" type="text/css" href="dist/gal.style.min.css" />
            <script type="text/javascript" src="vendor/dist/jquery.min.js"></script>
            <script type="text/javascript" src="dist/jquery.gal.min.js"></script>
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
Do not forget to place img folder (which is provided in dist folder) into the root of your webpage.

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
    
    $('div#scene').gal({"nrOfImgs": 4,"imagesDir" : "img/gallery/"});
    
    
});
    
```


