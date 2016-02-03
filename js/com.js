/*
	自动播放插件

	原理记录：
	1、先写元素点击事件，这个是不包含在插件中的
	2、将元素对应事件绑定到插件上，并设置执行间隔
	3、重点在zd()这个函数中，他是取当前的hover并判断下一步执行哪个内容
*/
/*
	自动播放动画插件
*/
(function(){
	// 定义当前在播放动画的timeout
	var t1 = t2 = t3 = null;
	// 公用方法或者变量
	var inits = function(opt)
	{	
		// 默认值
		this.defaults = {
			// 主内容元素
			obj:'.tab_div',
			// 焦点元素
			hovers:'.tab_t span',
			// 焦点元素类名
			focusClass:'hover',
			// 播放时间
			inTime:[],
			// 出场时间
			outTime:[],
			// 入场动画
			inDh:[],
			// 出场动画
			outDh:[],
		},
		// 用户定义值取代默认值
		this.options = $.extend(this.defaults,opt),
		this.objLength = $(this.options.obj).length
	};
	// 自动播放功能
	inits.prototype = {
		zd: function(){
				// 把this指向inits，用来在子func中取opt
				var init = this;
				// 清空定时内容
				clearTimeout(t1);
				clearTimeout(t2);
				clearTimeout(t3);
				// 每次重置
				t1 = t2 = t3 = null;
				// 找出当前索引
				var showIndex = $(init.options.hovers + '.' + init.options.focusClass).index();
				// 执行当前场次入场
				init.options.inDh[showIndex]();
				// 出场
				t1 = setTimeout(function(){
					init.options.outDh[showIndex]();
				},init.options.inTime[showIndex]);
				// 设置等等时间
				t2 = setTimeout(function(){
					// 如果不是最后一个，跳转显示下一个，如果已经是最后一个，显示第一个
					if (showIndex < init.objLength - 1 )
					{
						$(init.options.obj).eq(showIndex + 1).show().siblings().hide();
						$(init.options.hovers).eq(showIndex + 1).addClass(init.options.focusClass).siblings().removeClass(init.options.foucsClass);
					}
					else
					{
						$(init.options.obj).eq(0).show().siblings().hide();
						$(init.options.hovers).eq(0).addClass(init.options.foucsClass).siblings().removeClass(init.options.foucsClass);
					}
					// 调用自身，用来循环
					init.zd();
				},init.options.inTime[showIndex] + init.options.outTime[showIndex]);
			}
	};
	$.fn.li_tabs_dh = function(options){
		var init = new inits(options);
		// 初始化显示
		$(init.options.obj).hide().first().show();
		// 自动播放开始
		init.zd();
		// 点击切换功能
		$(init.options.hovers).bind('click',function(){
			// 开始手动切换，点击的索引
			var TI = $(this).index();
			// 找出当前索引
			var showIndex = $(init.options.hovers + '.' + init.options.focusClass).index();
			// 执行当前场次出场
			// 清空定时内容
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			t1 = t2 = t3 = null;
			init.options.outDh[showIndex]();
			t3 = setTimeout(function(){
				$(this).addClass(init.options.foucsClass).siblings().removeClass(init.options.foucsClass);
				$(init.options.obj).eq(TI).show().siblings().hide();
				$(init.options.hovers).eq(TI).addClass(init.options.foucsClass).siblings().removeClass(init.options.foucsClass);
				init.zd();
			},init.options.outTime[showIndex]);
			// 再次开始自动切换
		});
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
