(function($){
  $.fn.CollapseSidebar = function(options, callback){
    if(typeof options == "string"){
      //execute method
    }else{
      var settings = $.extend({
        sidebar:"left",
        width:260
      }, options);
      
    }
  }
}(jQuery));
