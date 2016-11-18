;
$(function() {
    function showLogo() {
        var width = $(".index").width(),
            height = $(".index").height(),
            logoWidth, logoHeight, top, left;

        if(width / height >= activityImg.width / activityImg.height){
            $(".index").css("backgroundSize", "100% auto");
        }else{
            $(".index").css("backgroundSize", "auto 100%");
        }

        if (logo.complete != true)
            return;

        if (width / height >= logo.width / logo.height) {
            logoWidth = height * logo.width / logo.height * SIZE;
            logoHeight = height * SIZE;
        } else {
            logoWidth = width * SIZE;
            logoHeight = width * logo.height / logo.width * SIZE;
        }
        top = (height - logoHeight) / 2;
        left = (width - logoWidth) / 2;
        $(".logo").css({
            width: logoWidth,
            height: logoHeight,
            top: top < 0 ? 0 : top,
            left: left < 0 ? 0 : left,
        });

    }

    var logo = new Image(),
        activityImg = new Image(),
        SIZE = 0.4,
        DURATION = 14500;

    $(logo).on("load", function(){
        $(this).appendTo(".logo");
        showLogo();
    });
    $(activityImg).on("load", function(){
        $(".index").css("backgroundImage",
            "url(../static/img/628635632479458910.jpg)");
        showLogo();
    });

    logo.src = "../static/img/logo.png";
    activityImg.src = "../static/img/628635632479458910.jpg";

    $(".menu").hover(function(){
        $("#leaders").slideDown(300);
    }, function(){
        $("#leaders").slideUp(300);
    });

    function placePhoto(){
        var maxNum = parseInt($(".page").width() /  $(".box").outerWidth(true));
        $(".pages").html("<div class=\"page page_" + 
            ((photos.length - start) > maxNum ? 2 : 1) + 
            "\">" + (photos.slice(start, start + maxNum * 2)
            .map(function(value){
                return "<div class=\"box\">" +
                        "<img src=\"" + value +"\">" + 
                    "</div>"
            }).join("") || "<div class=\"box\">" + 
            "</div>") + "</div>");
        $(".imgSlider").remove();
        isBigger = false;
    }

    var photos = [
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/628635632479458910.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
            "../static/img/674528783993979927.jpg",
        ],
        start = 0;

    $(".part2").find(".left").click(function(){
        var maxNum = parseInt($(".page").width() /  340);

        start = start < maxNum * 2 ?
                0 : start - maxNum * 2
        placePhoto();
    }).end().find(".right").click(function(){
        var maxNum = parseInt($(".page").width() /  340);

        if(photos.length - start <= maxNum * 2)
            return

        start += maxNum * 2;
        placePhoto();
    });

    var biggerSize = 0.9,
        isBigger = false;

    $(".pages").delegate("img", "click", function(){
        if(isBigger)return;
        isBigger = true;

        var offset = $(this).offset(),
            scrollTop = $(document.body).scrollTop(),
            width = $(document.body).width(),
            height = $(document.body).height(),
            toWidth, toHeight;

        if(width / height > this.naturalWidth / this.naturalHeight){
            toWidth = height * this.naturalWidth / this.naturalHeight * biggerSize;
            toHeight = height * biggerSize;
        }else{
            toWidth = width * biggerSize;
            toHeight = width * this.naturalHeight / this.naturalWidth * biggerSize;
        }

        $(document.body).append("<div class=\"imgSlider\"></div>");

        var fromCss = {
            position: "fixed",
            top: offset.top - scrollTop,
            left: offset.left,
            width: $(this).width(),
            height: $(this).height(),
            zIndex: 5,
        }

        $(this).css($.extend({}, fromCss))
        .stop().animate({
            width: toWidth,
            height: toHeight,
            top: (height - toHeight) / 2,
            left: (width - toWidth) / 2
        }).click(function(){
            $(".imgSlider").remove();
            console.log(fromCss);
            $(this).stop().animate({
                width: fromCss.width,
                height: fromCss.height,
                top: fromCss.top,
                left: fromCss.left,
            }, function(){
                $(this).removeAttr("style");
                isBigger = false;
            });
        });
    });

    $(window).resize((function(){
        showLogo();
        placePhoto();
        return arguments.callee;
    })());
});
