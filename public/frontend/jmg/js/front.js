/// <reference path="../../js/jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {


    $("#section7").click();
    $(".admin-dash").click(function () {

        window.location = "admin";

    })
    $(".driver-dash").click(function () {

        get_front_view('driver/front')

    })
    $(".customer-dash").click(function () {

        get_front_view('customer/front')

    })

    
})

