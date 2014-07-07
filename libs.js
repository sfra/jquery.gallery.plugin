/*properties deepExt, apply */


var libs=(function (){

    var deepExt=function(obj) {
        var item;
        for (item in obj) {
            if (typeof obj[item]==='object') {
                if (!this[item]) {
                    this[item]={};
                }
            libs.deepExt.apply(this[item],[obj[item]]);
            } else{
                this[item]=obj[item];
            
            }
        }
    };
    
    
    var addToLocalStorage=function(listName,value){
          var listStorage=sessionStorage.getItem(listName)===null?[]:sessionStorage.getItem(listName);
          listStorage+=value+';';
          sessionStorage.setItem(listName,listStorage);
        
        
        };
        
        
    var removeFromLocalStorage=function(listName,index){
            var listStorage=sessionStorage.getItem(listName)===null?[]:sessionStorage.getItem(listName);       
            var listArray=listStorage.split(';');
            listArray.splice(index,1);
            sessionStorage.setItem(listName,listArray.join(';'));
    }    
        

return {deepExt: deepExt, addToLocalStorage: addToLocalStorage, removeFromLocalStorage: removeFromLocalStorage};
})();







