/**
 * Created by Yuchuan on 2017/2/15.
 */
var over = false,
	aPage = $("body>div[class ^= 'page']"),
	gpsLi = $('.gps>li');


$(function() {
	//创建并设置索引
	var index = 0,
		playing = false;

	//滚动事件
	$(window).mousewheel(function(event, d) {
		if (over === false) {
			return;
		}
		if (playing !== true) {
			index -= d;
			if (index < 0) {
				index = gpsLi.length - 1;
			} else if (index > gpsLi.length - 1) {
				index = 0;
			}

			//滚动事件节流
			playing = true;
			setTimeout(function() {
				playing = false;
			}, 700);

			setGps(index);
			setFirst(index);
			resident(index);
			open(index);

		}

	});

});



/*---------------------------------------封装函数------------------------------------------*/
//设置gps
function setGps(index) {
	gpsLi.eq(index).css('opacity', '1').siblings().css('opacity', '0.5');
}

//设置第一页面
function setFirst(index) {
	aPage.eq(index).css("zIndex", 50).siblings("[class ^= 'page']").css("zIndex", 0);
}

//设置进场动画
function open(index) {
	aPage.eq(index).removeClass('open').siblings("[class ^= 'page']").addClass('open');
}

$(window).on('load', function() {
	aPage.eq(0).removeClass('open');
	$('#loader').fadeOut(1000, function() {
		over = true;
	});
});
//设置常驻组件
function resident(index) {
	if (index === 0) { // 第一屏
		$('header').hide();
		$('.hint').show();
	} else {
		$('header').show();
		$('.hint').hide();
	}
}
