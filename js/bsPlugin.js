(function($){
  $.fn.CollapseSidebar = function(options, callback){
    var $me = this;
    var sidebarClass ="sidebar-nav";
    var actionClass ="sidebar-nav-toggler";
    var $nav; 

    var onNodeclick = function(e){
      e.preventDefault();

      if($nav.hasClass("active")){
        $nav.removeClass("active");
        $nav.css("left", 0);
      }else{
        $nav.addClass("active");
        $nav.css("left", "-" + $nav.css("width"));
      }
    }

    var bindEvents = function(){
      $me.on("click", onNodeclick);
    }

    var getSidebar = function(){
      var $sidebarEl;
      if($me.get(0).tagName.toLowerCase() == "a"){
        $sidebarEl = $me.attr("href") ? $($me.attr("href")) : null;
      }else{
        $sidebarEl = ($me.data()  || $me.data().target) ? $($me.data().target) : null;
      }

      return ($sidebarEl && $sidebarEl.hasClass(sidebarClass)) ? $sidebarEl : null;
    }

    var configSingleOption = function(opt){
      switch (opt){
        case "show":
          $nav.addClass("active");
          break;
        case "hide":
          $nav.removeClass("active");
          break;
        default:
          console.warn("CollpaseSidebar: Invalid option");
      }
    }
    var configSettingOptions = function(settings){
      for(var k in settings){
        if(k == "sidebar"){
          if(settings[k] === "right"){
            $nav.addClass("sidebar-right");
          }else{
            $nav.removeClass("sidebar-right");
          }
        }else if(k == "show"){
          if(settings[k] === true){
            $nav.addClass("active");
          }else{
            $nav.removeClass("active");
          }
        }else if(k == "width"){
          $nav.css(k,settings[k]) ;
          $nav.css("left","-" + settings[k] + "px") ;
        }
      }
    }

    var init = function(){
      if(!$me.hasClass(actionClass)){
        return;
      }

      $nav = getSidebar();
      if(!$nav || !$nav.length) return;

      bindEvents();

      if(typeof options == "string"){
        configSingleOptions(options);
      }else{
        var settings = $.extend({
          sidebar:"left", // valid value: "left" and "right"
          width:300,
          show:true
        }, options);
        configSettingOptions(settings);

      }
    }

    init();

    return $me;

  }
}(jQuery));

$(document).ready(function(){
  //var $dom = $("#mynav");
  //var test = $dom.CollapseSidebar({sidebar:"right",width:500});

  var $btnSidebar = $(".sidebar-nav-toggler");
  $btnSidebar.CollapseSidebar();

});
