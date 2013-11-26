
(function($){

$.fn.gal=function(options){
  

                    
  //var opt=$.extend({},$.fn.gal.defaults,options);
  var opt={};
  libs.deepExt.apply(opt,[$.fn.gal.defaults]);
  libs.deepExt.apply(opt,[options]);
  
  console.log(options);  
  console.log(opt);

  
    var gal_scene=this;
    this.children("img").wrap("<div></div>");
    this.addClass("gal_scene");
    this.find("div>img").addClass("gal_img");
    
    var gal_close=$("<img />").attr({"src":"img/gal_close.png","width":"10px"}).data({"gal_close":true}).addClass("gal_close");
    var gal_left=$("<img />").attr({"src":"img/gal_left.png","width":"10px","class":"gal_left"});
    var gal_right=$("<img />").attr({"src":"img/gal_right.png","width":"10px","class":"gal_right"});
    var gal_buttons=$('div.gal_scene').find("div");
    var nrOfButtons=gal_buttons.length;
    var width=parseInt(gal_scene.css("width"));
    var heightButton=parseInt($(gal_buttons[0]).css("height"));

    var wrapper=$("<div />").attr("class","wrapper");
    var widthButton=parseInt(width/nrOfButtons)-10;
    $("img.gal_img").css({"opacity": opt.mouseOut.opacity})
    
    
    
      
    
    var open=false;
    
    
    
    gal_buttons.children("img").css({
        "width": widthButton-10+"px"
        }).on("mouseover",function(){
    
            $(this).animate({"opacity":1},500);    
    
        }).on("mouseout",function(){
        
            $(this).animate({"opacity":opt.mouseoutOpacity},500);
        });
    
    
    gal_buttons.addClass("gal_button").css({
        "width":widthButton
        
        }).on("click",function(){
            
            if (open) {
                return;
            }
            open=true;
            var self=$(this);
            var html=$(this).html();
            var position=$(this).position();

            
            $(this).fadeTo(500,0.3).clone().empty().css({
                "width":"0px",
                "height":"0px",
                "background-color":opt.openProp["background-color"],
                "left": parseInt(gal_scene.css("width"))/2-6+"px"
                }).appendTo(gal_scene).addClass("gal_enlarged").animate({
                "width":parseInt(gal_scene.css('width'))-12+"px",
                "height":100+parseInt(gal_scene.css('height'))-12+"px",
                "left":5+"px",
                "top":5+"px"
                
                },opt.openProp.speed,function(){ $(this).html(html).fadeTo(0,0).fadeTo(500,1).prepend(gal_left).on("click",function(e){
                                        
                    if ( !$(e.target).hasClass("gal_left") ) {
                        return;
                    }
                    
                    var prev=self.prev();
                    if (prev==self) {
                        return;
                    }
                    var newImg=prev.children("img").attr("src");
                    
                    if (newImg!=undefined) {
                            console.log(newImg);
                            $(this).children("img.gal_img").attr("src",newImg);   
                    
                    
                    console.log("gal_left");
                    console.log(prev);
                    self=prev;

                    }
                    }).prepend(gal_right).on("click",function(e){
                     
                    
                        if ( !$(e.target).hasClass("gal_right") ) {
                        return;
                    }
                    
                    var nxt=self.next();
                    if (nxt.hasClass("gal_enlarged")) {
                        return; 
                    }
                    var newImg=nxt.children("img.gal_img").attr("src");
                    
                    if (newImg!=undefined) {
                            console.log(newImg);
                            $(this).children("img.gal_img").attr("src",newImg);   
                                        
                     self=nxt;
                     
                    }                                         
                     
                     
                     
                     

                    }).prepend(gal_close).on("click",
                                function(e){
                
                                    if (!$(e.target).hasClass("gal_close")) {
                                         return false;
                                    }
                                    
                                //if (!$(e.target).data("gal_close")) {
                                //         return false;
                                //    }   
                
                                e.bubbles=false;
                                $(this).fadeOut(500).remove();
                                self.fadeTo(500,1);
                                open=false;
                
                                e.stopPropagation();
                                return false;
                                }).children("img.gal_img").css({
                                    "width":"100%"
                                });
                });
                
        });

  
  
  return this; 

}

$.fn.gal.defaults={
   enlarge: $.fn.fadeTo,
   openSpeed: 500,
   openbg: "#777777",
   mouseoutOpacity: 0.7,
   mouseOut: {"opacity":.7},
   openProp: {"speed":500,"css":{"opacity":.7},"background-color":"#777777"}
   
}


}( jQuery ));






