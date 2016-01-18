$(function() {
	// touchstart 还是不要禁用的好，要不然 输入框都检测不出来~~坑一个
	// document.addEventListener('touchstart',stopScrolling,false);
	document.addEventListener('touchmove',stopScrolling,false);
	// 计算高度及宽度
	document.load = resizeH();
	$(window).resize(function(){
		resizeH();
	});
});
// 防止上拉下拉出现 浏览器滑动
function stopScrolling(touchEvent) {
	touchEvent.preventDefault();
}
// 计算高度及宽度
function resizeH(){
	var wWid = $(window).width(),wHgt = $(window).height(),hHgt = $('.head img').height();
	if (wHgt > 400) {
		$('.page').height((wHgt - hHgt) + 'px').css('top',hHgt + 'px');
		$('.p_bg').height((wHgt - hHgt) + 'px');
	}else{
		$('.page').height('400px').css('top',hHgt + 'px');
		$('.p_bg').height('400px');
	}
}
