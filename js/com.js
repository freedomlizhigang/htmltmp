/*
	自动播放插件

	原理记录：
	1、先写元素点击事件，这个是不包含在插件中的
	2、将元素对应事件绑定到插件上，并设置执行间隔
	3、重点在zd()这个函数中，他是取当前的hover并判断下一步执行哪个内容
*/
(function(){
	var inits = function(opt)
	{
		this.defaults = {
			// 主内容元素
			obj:'',
			// 焦点元素
			hovers:'',
			// 焦点元素类名
			focusClass:'hover',
			times:1500
		},
		// 用户定义值取代默认值
		this.options = $.extend(this.defaults,opt),
		this.zd = function(){
			// 找出当前索引
			var showIndex = $(this.options.obj + "." + this.options.focusClass).index();
			var objLength = $(this.options.obj).length;
			// 如果不是最后一个，跳转显示下一个，如果已经是最后一个，显示第一个
			if (showIndex < objLength - 1 )
			{
				$(this.options.obj).eq(showIndex + 1).trigger('click');
			}
			else
			{
				$(this.options.obj).eq(0).trigger('click');
			}
		}
	};
	$.fn.li_tabs = function(opt)
	{
		var init = new inits(opt);
		setInterval(function(){
			init.zd();
		}, init.options.times);
	}
})(jQuery);
/*
	end 自动播放插件完成
*/

$(function() {
	// 翻转
	$('.roundabout').roundabout({
   		minScale:0.5
	});
	// 左边的点击功能
	$('.list_fg li').bind('click',function(){
		var TIndex = $(this).index();
		$(this).addClass('hover').siblings().removeClass('hover');
		// 点击翻转
		$('.roundabout li').eq(TIndex).trigger('click');
	});
	// 点击图片时左边对应切换
	$('.roundabout li').bind('click',function(){
		var TIndex = $(this).index();
		$('.list_fg li').eq(TIndex).addClass('hover').siblings().removeClass('hover');
	});

	// 欧式风格 自动播放
	$('.list_fg').li_tabs({
		obj:'.list_fg li',
		times:2500,
	});


	// 

	// 品质操控 点击
	$('.pzck_r img').hide().first().show();
	$('.tabs_t_img span').bind('click',function(){
		var TIndex = $(this).index();
		$(this).addClass('hover').siblings().removeClass('hover');
		// 点击翻转
		$('.pzck_r img').eq(TIndex).show().siblings().hide();
		$('.tabs_t_text p').eq(TIndex).show().siblings().hide();
	});
	// 品质操控 自动播放
	$('.pzck_r').li_tabs({
		obj:'.tabs_t_img span',
		times:2500,
	});

	


});
