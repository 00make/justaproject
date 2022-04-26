var app = {
    start: function () {
        $('.sBtn').click(function () {
            $('.mark').show();
        });
        $('.djks').click(function () {
            if ($('input').val()) {
                var name = $('input').val();
                window.sessionStorage.setItem('name', name);
                location.href = './answer.html';
            }
        });
    },
    answer2: function () {
        var score = 0;
        $('.answerBox ul').on('click', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        var n = 0;
        $('.nexBtn').click(function () {
            if ($('.answerBox ul li').hasClass('active')) {

                if ($("#ans0").hasClass('active')) {
                    console.log(data[n].sc[0]);
                    score += data[n].sc[0];
                }
                if ($("#ans1").hasClass('active')) {
                    console.log(data[n].sc[1]);
                    score += data[n].sc[1];
                }

                window.sessionStorage.setItem('score', score);
                n++;
                console.log(data[n]);
                if (n > 9) {
                    console.log('最后一题');
                    location.href = './result.html';
                } else {
                    $('.answerBox ul li').removeClass('active');
                    $('.answerBox .answerA').hide();
                    $('.answerBox ul').hide();
                    $('.answerBox .answerA').text(data[n].a);
                    for (var i = 0; i < data[n].q.length; i++) {
                        $('.answerBox ul li').eq(i).find('span').text(data[n].q[i]);
                    }
                    if (n >= 9) {
                        $(this).addClass('active');
                    }
                    $('.answerBox .answerA').show();
                    $('.answerBox ul').show();
                }
            }
        });
    },
    result: function () {
        var name = window.sessionStorage.getItem('name');
        var score = window.sessionStorage.getItem('score');
        console.log(name);
        console.log(score);
        $('.reBox h3 span').text(name);
        var ca = '';
        html2canvas($(".bg")[0], {
            onrendered: function (canvas) {
                ca = canvas.toDataURL();
                $(".save a").attr('href', canvas.toDataURL());
                $(".save a").attr('download', 'share.png');
            }
        });
        $('.save').click(function () {
            $('.mark').show();
            Window.href = ca;
        });
        $('.mark').click(function () {
            $('.mark').hide();
        });
        $('.mark div').click(function (event) {
            event.stopPropagation()
        });

        //make index
        // Math.seed = name.charCodeAt(1);
        // var index = Math.floor((Math.seededRandom() * hudata.length));
        if (score <= 12) { var index = 0; }
        else if (score < 14) { var index = 1; }
        else if (score < 16) { var index = 2; }
        else if (score < 18) { var index = 3; }
        else { var index = 4; }

        console.log(hudata[index]);
        $('.imgBox img').attr('src', 'images/' + (index + 1) + '.png');
        $('.luoma img').attr('src', 'images/' + (index + 1) + '.png');
        $('.huname div').text(hudata[index].t);
        $('.content div').html(hudata[index].r);
        $('.huodong div').text(hudata[index].t);
    },
    answer: function () {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            lazyLoading: true,
            mousewheelControl: true,
            watchSlidesProgress: true,
            onInit: function (swiper) {
                swiper.myactive = 0;
            },
            onProgress: function (swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate, boxShadow;
                    translate = progress * swiper.height * 0.8;
                    scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                    boxShadowOpacity = 0;
                    slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                    if (i == swiper.myactive) {
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                        es.zIndex = 0;
                    } else {
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = '';
                        es.zIndex = 1;
                    }
                }
            },
            onTransitionEnd: function (swiper, speed) {
                swiper.myactive = swiper.activeIndex;
            },
            onSetTransition: function (swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    es = swiper.slides[i].style;
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
                }
            }
        })
    }
}
