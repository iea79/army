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


	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});


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


    // accordion
    $('.accordion__toggle').on('click', function() {

        var item = $(this).closest('.accordion__item');
        item.toggleClass('open');

    });

    $(".fileupload input[type=file]").change(function(){
        var filename = $(this).val().replace(/.*\\/, "");
        $("#filename").text(filename);
    });

    $('.accordion__toggle_icon').on('click', function(){
        $(this).closest('.accordion__item').remove();
    });

    $( "#datepicker" ).datepicker();

    selectEvents();

});


function selectEvents() {

    // инит и проставление плэсхолдеров. если используем вместе с label то плэйсхолдер пустой
    $('select').each(function(index, el) {
        $(this).select2({
            placeholder: $(this).data('placeholder'),
            minimumResultsForSearch: 15
        });
    });


    // селект с чекбоксами
    $('.js_multiplecheck').select2({
        closeOnSelect: false
    })

    $('.js_multiplecheck').on('select2:open', function() {
        var container = $('.select2-container').last();
        var wrap = $(this).closest('.js_multiplecheckwrap');
        container.addClass('js_select');
        container.appendTo(wrap);
    });

    // select2 в фильтрах
    $('.filters__item select').on('select2:open', function() {
        var container = $('.select2-container').last();
        var wrap = $(this).closest('.filters__item');
        container.addClass('filters__selectDrop');
    });

    // Открытие по клику на label
    var selectLabelClick = false;

    $('.select__label').on('click', function() {
        var select = $(this).parent().find('select');
        var selectCont = $(this).parent().find('.select2');
        $(this).toggleClass('open');
        var selectLabelClick = true;
        if ($(this).hasClass('open')) {
            select.select2('open');
            // console.log("open")
        } else {
            select.select2('close');
            // console.log("close")
        }
        var selectLabelClick = false;
    });

    $('select').on('select2:close', function() {
        if (selectLabelClick = false) {
            $(this).parent().find('.select__label').removeClass('open');
        }
    });

    $('select').on('select2:open', function() {
        if (selectLabelClick = false) {
            $(this).parent().find('.select__label').addClass('open');
        }
    });

}

