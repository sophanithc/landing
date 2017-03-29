(function($){
  $.fn.CollapseSidebar = function(options, callback){
    var me = this;
    var className ="sidebar-nav";
    var $el;
    var configOptions = function(opt){
      switch (opt){
        case "show":
          this.addClass("active");
          break;
        case "hide":
          this.removeClass("active");
          break;
        case "collapse-sidebar":
          console.log("I'm an enginner");          
          break;
        default:
          console.warn("CollpaseSidebar: Invalid option");
      }
    }
    var config = function(opt, val){
      switch (opt){
        case "sidebar":
          if(val !== "right"){
            me.removeClass("sidebar-right");
            me.addClass("sidebar-left");
          }
          else{
            me.removeClass("sidebar-left");
            me.addClass("sidebar-right");
          }
          break;
        case "width":
          me.css(opt, val + "px");
          break;
        case "show":
          if(val === true){
            me.addClass("active");
          }else{
            me.removeClass("active");
          }
          break;
        default:
          console.warn("CollpaseSidebar: Invalid option");
      }

    }

    var onclick = function(e){
      e.preventDefault();
      var $dom;
      if(!me.data() || !me.data().target){
        return;
      }
      $dom = $(me.data().target);
      if(!$dom.length)
        return;

      $dom.toggleClass("active");

    }

    var bindEvents = function(){
      me.on("click", onclick);
    }

    var init = function(){
      bindEvents();
      /*
      if(typeof options == "string"){
        configOptions(options);
      }else{
        var settings = $.extend({
          sidebar:"left",
          width:260,
          show:true
        }, options);

        for (var key in settings){
          config(key, settings[key]);
        }
      }
      */
    }

    init();

    return this;

  }
}(jQuery));

$(document).ready(function(){
  //var $dom = $("#mynav");
  //var test = $dom.CollapseSidebar({sidebar:"right",width:500});

  var $btnSidebar = $(".sidebar-nav-toggler");
  $btnSidebar.CollapseSidebar();

});
