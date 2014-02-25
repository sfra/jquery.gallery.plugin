/*properties deepExt, apply */


var libs=(function (){

    var deepExt=function(obj) {
        var item;
        for (item in obj) {
            if (typeof obj[item]==="object") {
                if (!this[item]) {
                    this[item]={};
                }
            libs.deepExt.apply(this[item],[obj[item]]);
            } else{
                this[item]=obj[item];
            
            }
        }
    };

return {deepExt: deepExt};
})();







