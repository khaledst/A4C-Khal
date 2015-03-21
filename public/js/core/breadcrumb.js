/// <reference path="../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    $(".breadcrumb li a").click(function () {

        $(".breadcrumb li a").removeClass("active");
        $(this).addClass("active");
        var controller = $(this).attr("href");

        $.get(controller + '/dashboard', null).done(function (data) {
            $("#content").html(data);
        })

        return false;
    })

})
