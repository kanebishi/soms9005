$(function(){
  // bodyの画像数を取得
  var imgNum = imagesLoaded('body').images.length;

  // 読み込んだ画像の数を格納
  var loadedImg = 0;

  // 現在のプログレス値を格納
  var progressNowPosition = 0;

  // 1秒間に50回、progressMonitor()を実行する
  Timer = setInterval(progressMonitor, 1000/50);

  // 画像を読み込んだらloadedImgを加算する
  imagesLoaded('body').on('progress', function(){
    loadedImg++;
  });

  // 画像の読み込み状況をチェックし、更新する関数
  function progressMonitor(){

    // 読み込んだ画像のパーセンテージ
    var progressPosition = imgNum == 0 ? 100 : (loadedImg/imgNum) * 100;

    // プログレス値を現在値と目標値からイージングする
    progressNowPosition += (progressPosition-progressNowPosition) * 0.1;

    // プログレスバーの横幅を指定する
    $('.js-loading_bar').css('width', progressNowPosition+'%');

    // 読み込んだ画像のパーセンテージ数値を表示する
    $('.js-loading_progress_text').text(Math.floor(progressNowPosition)+'%');

    // 読み込みが完了した場合の処理
    if(progressNowPosition >= 100){
      clearInterval(Timer);
      redingDone();
    }

    // イージング計算を完了させる
    if(progressNowPosition > 99.9){
      progressNowPosition = 100;
    }

    //console.log(progressNowPosition);

  }

	function redingDone(){
		$('.js-loading').velocity(
				"fadeOut", {
				duration:600,
				delay:600
			}
		);
	}

  $('a[href^="#pagetop"]').click(function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

});
