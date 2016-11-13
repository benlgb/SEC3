;
$(function() {
    function showLogo() {
        if (logoGif.complete != true)
            return;

        var width = $(document.body).width(),
            height = $(document.body).height() - 90,
            logoWidth, logoHeight, top, left;

        if (width / height >= logoGif.width / logoGif.height) {
            logoWidth = height * logoGif.width / logoGif.height * SIZE;
            logoHeight = height * SIZE;
        } else {
            logoWidth = width * SIZE;
            logoHeight = width * logo.height / logo.width * SIZE;
        }
        top = (height - logoHeight) / 2 - 45;
        left = (width - logoWidth) / 2;
        $([logoGif, logo]).css({
            width: logoWidth,
            height: logoHeight,
            position: "absolute",
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

    $(".menuText").click(function(){
        $("#leaders").slideToggle(300);
    })
});
