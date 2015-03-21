var departing = null;
var arrival = null;
var mode = null;

$(document).ready(function () {

    departing = new google.maps.places.Autocomplete(document.getElementById('departing'));
    google.maps.event.addListener(departing, 'place_changed', function () {
        var place = departing.getPlace();
        var address = place.formatted_address;        $("#departing").data("lat", place.geometry.location.lat())
        $("#departing").data("lng", place.geometry.location.lng());

    });


    arrival = new google.maps.places.Autocomplete(document.getElementById('arrival'));
    google.maps.event.addListener(arrival, 'place_changed', function () {

        var place = arrival.getPlace();
        var address = place.formatted_address;
        $("#arrival").data("lat", place.geometry.location.lat())
        $("#arrival").data("lng", place.geometry.location.lng())

    });

    //form inicialization
    form_inicialization();
});




//form inicialization
function form_inicialization() {

    mode = $("#offer").data("mode");
    //type de parcours
    //TZG -> trajeect ZOne Geografique
    //TAB -> traject A a B
    //TLD -> traject longue distance
    $("#offer").data("trip", "TZG");
    $(".arrival_group").slideUp();
    $("#trip_method").change(function () {

        var value = $(this).val();
        switch (value) {
            case 'TZG':
                {
                    $("#offer").data("trip", "TZG");
                    $(".arrival_group").slideUp();
                    $(".offer").find("#arrival").val('').change(); ;
                    $("#radiusa").slider("value", 0);
                    $(".offer").find("#calc_method [value='3']").hide();
                    $(".offer").find("#calc_method").val(1).change();
                }
                break;
            case 'TAB':
                {
                    $("#offer").data("trip", "TAB");
                    $(".arrival_group").slideDown();
                    $(".offer").find("#calc_method [value='3']").show();
                }
                break;
            case 'TLD':
                {
                    $("#offer").data("trip", "TLD");
                    $(".arrival_group").slideUp();
                    $(".offer").find("#arrival").val('').change(); ;
                    $("#radiusa").slider("value", 0);
                    $(".offer").find("#calc_method [value='3']").hide();
                    $(".offer").find("#calc_method").val(1).change();
                }
                break;

        }

    });

    //upload iniciallization
    $("[data-action='upload']").css("cursor", "pointer");
    //upload pub to Prestation
    $("[data-action='upload']").click(function () {

        $("#tarif_upload").click();

    })

    $("#tarif_upload").change(function () {

        //get form Mode
        mode = $("#offer").data("mode");



        var files = $("#tarif_upload").prop('files');


        if (files.length > 0) {
            var file = $("#tarif_upload").prop('files')[0];
            var size = file.size / 1024000;

            if (size < 1) {
                var filename = file.name;
                var index_dot = reverse(filename).indexOf('.')
                var ext = filename.substring(filename.length - index_dot);



                if (ext.match('/gif|png|jpg|GIF|PNG|JPG/').length > 0) {

                    var readImg = new FileReader();

                    $("#upload_offre_img_btn").hide();

                    readImg.onload = (function (file) {
                        return function (e) {


                            $("#offre_img").attr('src', e.target.result);

                            $("#offre_img").fadeIn();
                            $("#upload_offre_img").show();
                        };
                    })(file);

                    readImg.readAsDataURL(file);


                    $(".upload_status").knob({
                        'width': 120,
                        'change': function (v) { console.log(v); }
                    });
                    $(".upload_status").parent().fadeOut(200, function () { $(this).remove(); })
                }
                else {
                    toastr.warning("L'extention du ficheir ne supporté, veillhez ajoutér un fichier d'image PNG óu JPG")

                }
            }
            else {

                toastr.warning("L'extention taiile du fichiér és trop lour supporté, veillhez ajoutér un fichier jusque á 1 MB")

            }
        }
        else {

            if ($('.logo.upload canvas').length > 0) {

                $('.logo.upload canvas').parent().remove();


            }
        }
        var i = 0;
        setInterval(function () {

            i = i + 1;
            $('.upload_status')
        .val(i)
        .trigger('change');
        })
    })



    $("#radiusd").slider({
        range: "max",
        min: 1,
        max: 200,
        value: 10,
        slide: function (event, ui) {

            $("#step-radiusd").text(ui.value + ' KM').change();
        }
    });
    $("#step-radiusd").text($("#radiusd").slider("value") + ' KM');

    $("#radiusa").slider({
        range: "max",
        min: 1,
        max: 200,
        value: 10,
        slide: function (event, ui) {
            $("#step-radiusa").text(ui.value + ' KM').change();
        }
    });
    $("#step-radiusa").text($("#radiusa").slider("value") + ' KM');




    //timeshhet Controls   
    $("[data-action='show_hide_timesheet']").click(function () {

        var mode = $(this).data("mode");

        if (mode == "collapsed") {
            $("#grid_wrapper").slideDown();
            $(this).text("Hide");
            $(this).data("mode", "expanded");
        }
        else {
            $("#grid_wrapper").slideUp();
            $(this).data("mode", "collapsed");
            $(this).text("Show");
        }



    });

    $("[data-action='timesheet-week-work']").click(function () {

        set_timesheet_fullday(0, 5);

    })

    $("[data-action='timesheet-week-end']").click(function () {

        set_timesheet_fullday(5, 2);

    })

    $("[data-action='timesheet-week-all']").click(function () {

        set_timesheet_fullday(0, 7);

    })


    //when mode set controls that are possible t o bind by blade sintax such (combobox)

    if (mode == "edit") {

        var trip_method_selected = $("#trip_method").data("value");
        $("#trip_method").val(trip_method_selected).change();


        var calc_method_selected = $("#calc_method").data("value");
        $("#calc_method").val(calc_method_selected).change();

        //set departing radius
        set_slider("radiusd");
        set_slider("radiusa");

        //sert timesheet
        var offer_id = $(".offer").data("id");
        load_offer_availability(offer_id);

    }
    else {
        //bind deafult timesheehet
        load_offer_availability(-1);
    }




    //form submit

    $("#offer").validate({
        submitHandler: function (form) {

            var offer = get_offer();
            if (mode == "edit")
                offer.id = $(".offer").data("id");
            offer.title = $(".offer").find("#title").val();
            offer.description = $(".offer").find("#description").val();
            offer.departing = $(".offer").find("#departing").val();

            offer.dlat = $(".offer").find("#departing").data("lat");
            offer.dlng = $(".offer").find("#departing").data("lng");
            offer.radiusd = $("#radiusd").slider("value");
            offer.arrival = $(".offer").find("#arrival").val();
            offer.alat = $(".offer").find("#arrival").data("lat");
            offer.alng = $(".offer").find("#arrival").data("lng");
            offer.radiusa = $("#radiusa").slider("value");
            offer.active = ($(".offer").find("#status").find("[type='checkbox']").prop("checked") == true) ? 1 : 0;
            offer.trip_method = $(".offer").find("#trip_method").val();
            offer.calc_method = $(".offer").find("#calc_method").val();
            offer.cost = $(".offer").find("#cost").val();

            var drivers = $(".offer").find("#drivers").find(".active").find("[type='checkbox']");
            drivers = get_array_by_attribute(drivers, 'id', get_offer_driver, 'driver_id');

            var cars = $(".offer").find("#cars").find(".active").find("[type='checkbox']");
            cars = get_array_by_attribute(cars, 'id', get_offer_car, 'car_id');

            var data = { mode: $(".offer").data('mode'), offer: offer, drivers: drivers, cars: cars, timesheet: get_time_table() };

            $.post("offers/save", data).done(function (data) {

                var status = JSON.parse(data);
                parse_status(status);

                if (status.result) {

                    $.get("offers/dashboard").done(function (data) {
                        $("#content").html(data);

                    })
                }

            })
        }
    });

}


//get offer model
function get_offer() {

    var offer = new Object();
    offer.id = null;
    offer.title = null;
    offer.description = null;
    offer.departing = null;
    offer.dlat = null;
    offer.dlng = null;
    offer.radiusd = null;
    offer.arrival = null;
    offer.alat = null;
    offer.alng = null;
    offer.radiusa = null;
    offer.active = null;
    offer.calc_method = null;
    offer.cost = null;
    offer.trip_method = null;
    offer.company_id = null;
    return offer;
}

function get_offer_driver() {

    var OfferDriver = new Object();
    OfferDriver.offer_id = null;
    OfferDriver.driver_id = null;

    return OfferDriver;
}

function get_offer_car() {

    var OfferCar = new Object();
    OfferCar.offer_id = null;
    OfferCar.car_id = null;

    return OfferCar;
}









var z = null;



function get_array_by_attribute(arr, attribute, _model, _model_attribute) {


    var new_arr = [];

    $.each(arr, function () {

        var value = parseInt($(this).attr('data-' + attribute));
        var model = _model();
        $(model).attr(_model_attribute, value);
        new_arr.push(model);
    });

    return new_arr;
}

function load_offer_availability(id) {


    $('#timesheet').jtable({
        title: 'Timesheet',
        paging: false, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: false,
        actions: {
            listAction: 'offers/timesheet/' + id
        },
        selecting: false,
        fields: {
            time: {
                title: 'time/day',
                display: function (data) {
                    return set_time(data);
                }
            },
            Mon: {
                title: 'Monday',

                display: function (data) {

                    if (data.record.Mon == 'active') {
                        return set_active(this);
                    }

                }
            },
            Tue: {
                title: 'Tuesday',

                display: function (data) {

                    if (data.record.Tue == 'active') {
                        return set_active(this);
                    }
                }
            },
            Wed: {
                title: 'Wednesday',

                display: function (data) {
                    if (data.record.Wed == 'active') {
                        return set_active(this);
                    }
                }
            },
            Thu: {
                title: 'Thursday',

                display: function (data) {
                    if (data.record.Thu == 'active') {
                        return set_active(this);
                    }
                }
            },
            Fri: {
                title: 'Friday',

                display: function (data) {
                    if (data.record.Fri == 'active') {
                        return set_active(this);
                    }
                }
            },
            Sat: {
                title: 'Saturday',

                display: function (data) {
                    if (data.record.Sat == 'active') {
                        return set_active(this);
                    }
                }
            },
            Sun: {
                title: 'Sunday',

                display: function (data) {
                    if (data.record.Sun == 'active') {
                        return set_active(this);
                    }
                }
            }

        }
    });


    $('#timesheet').jtable('load', undefined, function () {

        var paint = false;
        $("#timesheet .jtable tbody tr").find("td[class!='hour']").css("cursor", "pointer");

        $("#timesheet .jtable tbody tr td").mouseover(function (ev) {


            if ($(ev.target).hasClass("hour") == false) {

                if (paint) {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                    }
                    else {
                        $(this).addClass("active");
                    }

                }
            }

        });



        $("#timesheet .jtable tbody tr td").mousedown(function (ev) {


            if ($(ev.target).hasClass("hour") == false) {
                paint = true;
                if (paint) {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                    }
                    else {
                        $(this).addClass("active");
                    }

                }
            }

        });


        $("#timesheet .jtable tbody tr td").mouseup(function () {
            console.log("paint false");
            paint = false;
        });
    });

}



function set_active(obj) {
    var element = $("<div class='active' ></div>");
    element.show(function () {
        $(this).parent().addClass("active");
        $(this).remove();
    }).fadeIn(200);
    return element;
}

function set_time(data) {
    var element = $("<div></div>");

    element.show(function () {
        if (data.record.hour < 10)
            $(this).parent().parent().attr("hour", '0' + data.record.hour + ':00');
        else
            $(this).parent().parent().attr("hour", data.record.hour + ':00');
        $(this).parent().addClass("hour");
        $(this).parent().text(data.record.time);


    }).fadeIn(200);
    return element;

}

function get_time_table() {

    Intervals = [];
    $("#timesheet .jtable thead tr th").slice(1).each(function (i, column) {

        var index = $(column).index();



        var interval = null;
        $("#timesheet .jtable tbody tr").each(function (j, row) {

            var cell = $(row).find("td").eq(index);

            if (cell.hasClass("active") && interval == null) {

                if (j < 23) {
                    interval = get_interval();
                    interval.start = $(row).attr("hour");
                    interval.day_week = $(column).text().substring(0, 3);
                }
                else {


                    interval = get_interval();
                    interval.start = $("#times .jtable tbody tr").eq(j).attr("hour");
                    interval.day_week = $(column).text().substring(0, 3);
                    interval.end = '23:59';
                    Intervals.push(interval);
                    interval = null;
                }

            }
            else {
                if (interval != null && cell.hasClass("active") == false) {

                    interval.end = $("#times .jtable tbody tr").eq(j).attr("hour");

                    Intervals.push(interval);
                    interval = null;
                } else {


                    if (interval != null && j == 23) {

                        interval.end = '23:59';
                        Intervals.push(interval);
                        interval = null;

                    }


                }

            }
        })

    })

    return Intervals;

}

