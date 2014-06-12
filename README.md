jquery.gallery.plugin
=====================

image gallery jquery plugin.
Put into the head section 
```html
        <link rel="stylesheet" type="text/css" href="gal.style.css" />
        <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.js"></script>
        <script type="text/javascript" src="jquery.gal.js"></script>
        <script type="text/javascript" src="libs.js"></script>
        <script type="text/javascript" src="script.js"></script>
```

In the body of put tags indicating images:

```html

 <div id="scene">
            <img src="img/01.jpg" />
            <img src="img/02.jpg" />
            <img src="img/03.jpg" />
            <img src="img/04.jpg" />
            <img src="img/05.jpg" />
            <img src="img/06.jpg" />
            <img src="img/07.jpg" />
  </div>

```

On the other hand put

```html
<ul id="gal_list">drop an image here</ul>
```
for the list where you can drop an enlarged image (which is stored as a name of the file, but it can be easily
used in some different way). 

To init gallery, put in script.js the following command:


```javascript

$(document).ready(function(){
    
    $('div#scene').gal();
    
    
});
    
```




or with parameters (which can contain objects as values):
```javascript

$(document).ready(function(){
    
    $('div#scene').gal({"mouseOut":{"opacity":.1}});
    
    
});
    
```


