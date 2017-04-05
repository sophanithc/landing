(function($){
  $.fn.CollapseSidebar = function(options, callback){
    var $me = this;
    var sidebarClass ="sidebar-wrapper";
    var actionClass ="sidebar-wrapper-toggler";
    var $overlay = $("#body-overlay");
    var $nav; 

    var onNodeclick = function(e){
      e.preventDefault();

      if($nav.hasClass("active")){
        showSidebar(false);
      }else{
        showSidebar(true);
      }
    }

    var onMaskClick = function(e){
      showSidebar(false);
    }

    var bindEvents = function(){
      $me.on("click", onNodeclick);
      $overlay.on("click", onMaskClick);
    }

    var getSidebar = function(){
      var $sidebarEl;
      if($me.get(0).tagName.toLowerCase() == "a"){
        $sidebarEl = $me.attr("href") ? $($me.attr("href")) : null;
      }else{
        $sidebarEl = ($me.data()  || $me.data().target) ? $($me.data().target) : null;
      }
      if($sidebarEl && $sidebarEl.hasClass(sidebarClass)){
        if(!$overlay.length){
          // injected body-overlay to the page
          $("body").prepend('<div id="body-overlay"></div');
          $overlay = $("#body-overlay");
        }

        return $sidebarEl;
      }else{
        return null;
      }
    }

    var showSidebar = function(show){
      if(show !== true){
        $nav.removeClass("active");
        $nav.css("left", "-" + $nav.css("width"));
        showBodyMask(false);
      }else{
        $nav.addClass("active");
        $nav.css("left", 0);
        showBodyMask(true);
      }
    }

    var showBodyMask = function(show){
      if(show === true){
        $overlay.css({
                      "display":"block", 
                      "height":"100%",
                      "width":"100%",
                    });
      }else{
        $overlay.css({
                      "display":"none", 
                      "height":"0",
                      "width":"0",
                    });
      }
    }

    var configSingleOption = function(opt){
      switch (opt){
        case "show":
          showSidebar(true)
          break;
        case "hide":
          showSidebar(false)
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
            showSidebar(true);
          }else{
            showSidebar(false);
          }
        }else if(k == "width"){
          $nav.css(k,settings[k]) ;
          if(settings["show"] && settings["show"]=== true){
            showSidebar(true);
          }else{
            showSidebar(false);
          }
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
        configSingleOption(options);
      }else{
        var settings = $.extend({
          sidebar:"left", // valid value: "left" and "right"
          width:300,
          show:false
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

  var $btnSidebar = $(".sidebar-wrapper-toggler");
  $btnSidebar.CollapseSidebar();

});
