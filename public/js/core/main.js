//This file will be executed every time that app opens

$(document).ready(function () {
   

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }



    $(".main-menu li a").click(function () {

        var controller = $(this).attr("href");

        $.get(controller + '/dashboard', null).done(function (data) {
            $("#content").html(data);
        })

        return false;
    })


    $.get("customers/1/dashboard", null).done(function (data) {
        $("#content").html(data);

    })



    $("[data-action='new']").click(function () {





    })


})
