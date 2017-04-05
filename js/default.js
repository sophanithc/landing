$(document).ready(function(){
	var $treeMenu = $(".mobile-sidebar-menu .treeview>.treeview-menu");
	$treeMenu.on("show.bs.collapse",function(){
		var $li =$(this).parent();
		$li.find(">a").addClass("active");
	});
	$treeMenu.on("hide.bs.collapse",function(){
		var $li = $(this).parent();
		$li.find(">a").removeClass("active");

	});

	$(".card-treeview>.tree-menu>a").on("click", function(){
		var $li = $(this).parent();
		var $subs = $li.siblings(".active");
		var $curMenu = $(this).siblings(".submenu");
		$li.toggleClass("active");
		if($subs.length){
			$subs.removeClass("active");
			$subs.find(".submenu").removeClass("menu-open");
			$subs.find(".submenu").slideUp(200);
		}
		if($curMenu.length && $curMenu.hasClass("menu-open")){
			$curMenu.removeClass("menu-open");
			$curMenu.slideUp(200);
		}else{
			$curMenu.addClass("menu-open");
			$curMenu.slideDown(200);
		}
	});

});