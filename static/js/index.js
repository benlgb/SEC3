;
$(function() {
    function showLogo() {
        var width = $(".index").width(),
            height = $(".index").height(),
            logoWidth, logoHeight, top, left;

        if (logoGif.complete != true)
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

    var logoGif = new Image(),
        logo = new Image(),
        SIZE = 0.6,
        DURATION = 14500;

    $(logoGif).on("load", function() {
        logoGif = $(this).appendTo(".logo")[0];
        showLogo();
        setTimeout(function() {
            $(logo).css("display", "inline");
            $(logoGif).stop().animate({
                opacity: 0,
            }, 200, function(){
                $(this).css("display", "none");
            });
        }, DURATION);
    });

    $(logo).on("load", function() {
        logo = $(this).appendTo(".logo").css({
            display: "none",
        })[0];
    });
    $(window).resize(showLogo);

    logoGif.src = "../static/img/LOGO.gif";
    logo.src = "../static/img/logo.jpg";

    $(".menu").hover(function(){
        $("#leaders").slideDown(300);
    }, function(){
        $("#leaders").slideUp(300);
    });
});
