var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	// gridMatch();

   	$('.lang__current').on('click', function(event) {
   		event.preventDefault();
   		$(this).closest('.lang').toggleClass('open');
   	});
   	$('.lang').on('mouseleave', function() {
   		$(this).removeClass('open');
   	});

   	$('.filters__toggle').on('click', function(event) {
   		event.preventDefault();
   		$(this).toggleClass('active');
   		$('.filters__drop').toggleClass('open');
   	});

   	$('select').each(function(index, el) {
   		$(this).select2({
	   		placeholder: $(this).data('placeholder'),
		    // allowClear: true,
		    minimumResultsForSearch: 15
	   	});
   	});


    // accordion
      $('.accordion__toggle').on('click', function() {

          // Создаем переменную для отдельного блока внутри которого находится переключаетель и скрытый текст
          // Для выбора элемента по которому кликнули используя $(this) (просто не забываем что их может быть много на странице)
          var item = $(this).closest('.accordion__item');
          // внутри item ищем скрываемый текст (написал просто для понимания что можно так использовать переменные)
          var content = item.find('.accordion__content');


          // Убираем класс active у всех переключателей
          $('.accordion__toggle').not($(this)).removeClass('active');

          // Убираем класс open у всех скрываемых контентов
          $('.accordion__content').removeClass('open');

          // У переключателя проверям наличие класса active
          if ($(this).hasClass('active')) {
              // Если класс active присутствует, а значит accordion__content виден, то
              // Удаляем у нажатого элемента класс active
              $(this).removeClass('active');
              // у accordion__content убираем класс open (скрываем контент)
              content.removeClass('open');
          } else {
              // Если у нажатого элемента нет класса active
              // у элементу по которому кликнули добавляем класс active
              $(this).addClass('active');
              // для accordion__content добавляем класс open (показываем контент)
              content.addClass('open');
          }
      });

      $(".fileupload input[type=file]").change(function(){
           var filename = $(this).val().replace(/.*\\/, "");
           $("#filename").text(filename);
      });

      $('.js_multiplecheck').select2({
        closeOnSelect: false
      })

      $('.js_multiplecheck').on('select2:open', function() {
        var container = $('.select2-container').last();
        var wrap = $(this).closest('.js_multiplecheckwrap');
        container.addClass('js_select');
        console.log('open');
        
        container.appendTo(wrap);
      });

});
    // accordion

// });

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	// gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

// function setGridMatch(columns) {
// 	var tallestcolumn = 0;
// 	columns.removeAttr('style');
// 	columns.each( function() {
// 		currentHeight = $(this).height();
// 		if(currentHeight > tallestcolumn) {
// 			tallestcolumn = currentHeight;
// 		}
// 	});
// 	setTimeout(function() {
// 		columns.css('minHeight', tallestcolumn);
// 	}, 100);
// }

