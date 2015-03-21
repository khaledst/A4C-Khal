/// <reference path="jquery-2.1.0-vsdoc.js" />

var api = 'http://37.187.140.172/';
//var api = 'http://localhost:8090/';
var interval = "day";

$(document).ready(function () {


    set_interval_accordion();
    get_bookings('today');
    getLocation()
})

function set_interval_accordion() {

    $(".interval li a").click(function () {
        var interval = $(this).data("interval");
        get_bookings(interval);
    })



}


var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
  Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};




var points = [];
var interval = null;
var repeat = 0;
function getLocation() {
    $("#tabcontainer").html("");
    if (navigator.geolocation) {

        total_distance = 0;
        start = true;
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        $(".driver-board").html('Geolocation is not supported by this browser.');
    }
}

function calc_distance() {
    var a = new Object();
    a.lat = 48.853315;
    a.lng = 2.358669;
    a.timestamp = new Date().getTime();


    var b = new Object();
    b.lat = 48.853548;
    b.lng = 2.3595;
    b.timestamp = new Date().getTime();


    var d = getDistance(a, b);
    console.log(d);
}
var time_unit = 5000;
var time = 0;
var total_distance = 0;
function showPosition(position) {


    var data = '<ul>'
    data += '<li class="time"><strong>TIME</strong><span></span></li>';
    data += '<li class="speed"><strong>SPEED</strong><span></span></li>';
    data += '<li class="distance"><strong>DISTANCE</strong><span></span></li>';
    data += '<li class="coord"><strong>COORD</strong><span></span></li>';
    data = $(data);

    var point = new Object();
    point.lat = position.coords.latitude;
    point.lng = position.coords.longitude;
    point.timestamp = new Date().getTime();
    points.push(point);
    var time = '0h 00m';

    if (points.length > 1) {

        var point_a = point;
        var point_b = points[points.length - 2];

        var d = getDistance(point_a, point_b);
        if (d > 10)
            total_distance = total_distance + d;
        else
            d = 0;
       
       
           
            //  speed_in_hour_meters  = 3600
            //  distance  in 5sec 
        time = time + time_unit;
        var speed = d * 3600 / time_unit / 1000;

        $("#tabcontainer").append("<div style='color:black;'> Distance in 1 Sec" + d + " TOTAL:" + total_distance + " Speed" + speed + " KM/h - TIme diff:" + time + "</div></br>");
        var diff_time = get_diference_data(new Date(points[points.length - 2].timestamp), new Date(point.timestamp));
        //console.log(diff_time);
        time = diff_time.hours + 'h ' + parseInt(diff_time.minutes) + 'm';
    }



    data.find(".time").text(time);
    data.find(".distance").text(total_distance);
    data.find(".cord").text(Math.round(position.coords.latitude, 2) + '|' + Math.round(position.coords.longitude, 2))


    $(".driver-board").html(data.html());

    if (start) {

        setTimeout(function () {

            navigator.geolocation.getCurrentPosition(showPosition);
        }, time_unit);


    }
}





function get_bookings(interval) {

    var params = get_data();
    params.interval = interval;

    $.ajax({
        url: api + 'driver/bookings',
        xhrFields: {
            withCredentials: false
        },
        type: 'GET',
        dataType: 'json',
        data: params,
        success: function (data) {


            if (data.Records != undefined) {
                $("#" + params.interval).find(".accordion").empty();
                $.each(data.Records, function (item) {

                    var book = get_booking_ui(this);

                    $("#" + params.interval).find(".accordion").append(book);
                });

            }
            else {
                toastr.error("DATA NOT AVAILABLE");

            }

        },
        error: function () {

            toastr.error("SERVER NOT AVAILABLE");

        }
    });



}

var b = null;
function get_booking_ui(data) {

    var booking = '<section class="accordion-section">';
    booking += '<div class="accordion-head">';
    booking += '<span class="time-trip">8 min</span>';
    booking += '<ul class="info-trip">';
    booking += '<li>Departure : <em class="departing_date"></em></li>';
    booking += '<li>Arrival : <em class="arrival_date"></em></li>';
    booking += '<li>From : <em class="from"></em></li>';
    booking += '<li>To : <em class="to"></em></li>';
    booking += '<li>Service : <em class="service"></em></li> ';
    booking += '<li>Amount : <em class="amount"></em></li>';
    booking += '</ul>';
    booking += '</div>';
    booking += '<section id="accordion-1" class="accordion-section-content" style="">';
    booking += '<ul class="info-trip">';
    booking += '<li>Distance : <em class="distance"></em></li>';
    booking += '<li>Client name : <em class="client_name"></em></li>';
    booking += '<li>Vehicule : <em class="car_name"></em></li>';
    booking += '<li>Options :</li>';
    booking += '</ul>';
    booking += '<a href="#" class="no-bottom button-minimal grey-minimal">CALL</a>';
    booking += '<a href="#" class="no-bottom button-minimal purple-minimal">NOTIFY THE DEPARTURE</a>';
    booking += '<a href="#" class="no-bottom button-minimal green-minimal">START THE TRIP</a>';
    booking += '<a href="#" class="no-bottom button-minimal red-minimal">CANCEL THE TRIP</a>';
    booking += '</section>';
    booking += '<a class="accordion-section-title" href="#accordion-1">';
    booking += 'DETAILS';
    booking += '<span class="num-trip">n° <em class="id"></em></span>';
    booking += '</a>';
    booking += '</section>';

    booking = $(booking);

    booking.find(".from").text(data.departing_address);
    if (data.arrival_address.length > 0)

        booking.find(".to").text(data.arrival_address);


    booking.find(".departing_date").text(data.departing_date);
    if (data.arrival_date.length > 0)
        booking.find(".arrival_date").text(data.arrival_date);


    booking.find(".service").text(data.title);
    booking.find(".amount").text(data.total + ' €');
    booking.find(".id").text(data.id);

    booking.find(".distance").text(data.distance + ' KMS');
    booking.find(".client_name").text(data.full_name);
    booking.find(".car_name").text(data.car_name);

    var now = new Date();
    var booking_departing_date = new Date(data.departing_date);

    if (now.getTime() < booking_departing_date.getTime()) {
        time = get_diference_data(now.getTime(), data.departing_date);
        booking.find(".time-trip").text(time.hours + 'h ' + parseInt(time.minutes) + 'min');

    }
    else
        booking.find(".time-trip").text('EXPIRED');

    booking.find(".accordion-section-title").click(function (e) {

        console.log($(this).prev())
        if ($(this).prev().css("display") == "none")
            $(this).prev().slideDown(300);
        else
            $(this).prev().slideUp(300);

        e.preventDefault();
    });





    return booking;


}

function get_data() {
    var data = { 'app_chauffer_token': readCookie('app_chauffer_token') };
    return data;
}

function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}


