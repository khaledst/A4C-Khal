var departing = null;
var arrival = null;
var mode = null;
 

$(document).ready(function () {

    init_form();
    $(".start").focus();
});


function init_form() {

    $(".start").click(function () {


    })


    departing = new google.maps.places.Autocomplete(document.getElementById('departing'));
    google.maps.event.addListener(departing, 'place_changed', function () {

        setTimeout(function () {

            var place = departing.getPlace();
            var address = place.formatted_address;

            $("#departing").data("lat", place.geometry.location.lat())
            $("#departing").data("lng", place.geometry.location.lng());
            $(".start").focus()

        }, 2000);

    });


    $("#departing").keyup(function (e) {

        var code = e.which;
        if (code == 13) {

            setTimeout(function () {


                $(".start").focus()
                return false;

            }, 200);

        }

    });




    arrival = new google.maps.places.Autocomplete(document.getElementById('arrival'));
    google.maps.event.addListener(arrival, 'place_changed', function () {

        var place = arrival.getPlace();
        var address = place.formatted_address;
        $("#arrival").data("lat", place.geometry.location.lat())
        $("#arrival").data("lng", place.geometry.location.lng())
        return false;
    });




    $("#trip_method").change(function () {

        var value = $(this).val();
        switch (value) {
            case 'TZG':
                {
                    $("#offer").data("trip", "TZG");
                    //hide arrival control
                    $(".arrival_group").hide();
                    //hide extra columng
                    $(".location-extra-column").hide();
                    //show  value
                    $(".trip_value_estimation").slideDown()

                    set_slider_trip_value();

                }
                break;
            case 'TAB':
                {
                    $("#offer").data("trip", "TAB");
                    //trip calculation cause will be asked and gived by google api
                    $(".trip_value_estimation").hide();

                    //sho arrival input
                    $(".arrival_group").slideDown();

                    $(".location-extra-column").slideDown();
                }
                break;
            case 'TLD':
                {
                    //hide arrival control
                    $(".arrival_group").hide();
                    //hide extra column 
                    $(".location-extra-column").hide();

                    //show   trip value estimation

                    $(".trip_value_estimation").slideDown()
                    set_slider_trip_value();
                }
                break;

        }

    });




    $("#trip-value-estimation").slider({
        range: "max",
        min: 1,
        max: 8,
        value: 1,
        step: 0.5,
        slide: function (event, ui) {

            $("#trip-value-estimation-value").text(ui.value + ' HOURS').change();
        }
    });

    $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' HOURS');

    //set switch for calcul mode to KMS or to HOURS

    $("#calc_method").bootstrapSwitch();
    set_switch($("#calc_method"));
   
   
   
    $("#calc_method").on('switchChange.bootstrapSwitch', function (event, state) {
        console.log(state);

        if (state) {
            $("#trip-value-estimation").slider({
                range: "max",
                min: 1,
                max: 8,
                value: 1,
                step: 0.5,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' HOURS').change();
                }
            });


            $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' HOURS');



        }
        else
            set_slider_trip_value();



    });

    init_date_fields();
    $(".start").click(function () {
        offers = [];
        var validator = $(".trip").validate();
        validator.form();


        if (validator.errorList.length == 0) {
            {
                $("#offers-container").fadeOut(200);

                var trip = new Object();
                var time = $("#departing_date").val() + ' ' + $("[name='time']").val() + ':00';
                trip.departing = $("#departing").val();
                trip.departing_time = time;
                trip.calc_method = ($("#calc_method").prop("checked")) ? 2 : 1;
                trip.value = $("#trip-value-estimation").slider("value");
                trip.offers = true;

                var method = $("#trip_method").val();





                trip.trip_method = method;
                //departing coordiantes

                interval_place_dectetion = setInterval(function () {

                    var counter = 0;


                    if (counter < 6) {

                        if (departing.getPlace().geometry != null) {
                            clearInterval(interval_place_dectetion);


                            if (method == "TAB") {
                                trip.arrival = $("#arrival").val();
                                trip.alat = arrival.getPlace().geometry.location.lat()
                                trip.alng = arrival.getPlace().geometry.location.lng()

                            }
                            trip.dlat = departing.getPlace().geometry.location.lat()
                            trip.dlng = departing.getPlace().geometry.location.lng()


                            $.get("drivers/find/availablibility", trip).done(function (data) {

                                Availability = JSON.parse(data);
                                offers = Availability.offers;

                                setTimeout(function () {
                                    $("#offers-container").find(".offer-ui").remove();
                                    $("#offers-container").fadeIn();


                                    $.each(Availability.offers, function (i, offer) {

                                        var existing_offer = $("#offers-container").find(".offer-ui[id=" + offer.id + "]");

                                        if (existing_offer.length == 0 || existing_offer.length > 0 & existing_offer.attr("id") < 0) {
                                            console.log(offer);
                                            var offer_ui_example = $(".offer-ui-example").clone();
                                            offer_ui_example.removeClass("offer-ui-example").addClass("offer-ui");

                                            offer_ui_example.fadeTo("slow", 0);

                                            offer_ui_example.attr("id", offer.id);

                                            offer_ui_example.css("display", "block");
                                            if (offer.id > 0) {

                                                offer_ui_example.find(".box-type-pricing").addClass("style-support4");
                                                offer_ui_example.find(".text-center").removeClass("style-inverse");

                                                offer_ui_example.find(".type").text("PROMO TARIF");
                                            }
                                            else
                                                offer_ui_example.find(".type").text("BASIC TARIF");

                                            var price = '</span><h2><span class="text-xl price">' + parseFloat(offer.cost).toFixed(2) + '</span>$</h2>';
                                            offer_ui_example.find(".price").html(price);

                                            offer_ui_example.find(".title").text(offer.title);
                                            offer_ui_example.find(".reservation").click(function () {



                                            })
                                            $("#offers-container").append(offer_ui_example);
                                            offer_ui_example.data("offer", data);
                                        }

                                    });

                                    var offer_uis = $("#offers-container").find(".offer-ui");
                                    var count_ui = offer_uis.length - 1;
                                    var counter = 0;

                                    var interval_show_offers = setInterval(function () {


                                        if (counter <= counter) {

                                            $(offer_uis[counter]).fadeTo("slow", 1);
                                        }
                                        else {
                                            clearInterval(interval_show_offers);
                                        }

                                        counter = counter + 1;


                                    }, 400);




                                }, 500);



                            })


                        }
                        else
                            counter = counter + 1;

                    }
                    else {
                        clearInterval(interval_place_dectetion);
                        toastr.warning("cannot use the booking service at moment, please try again later");
                        return false;
                    }


                }, 400);

                return false;
            }

        }
    });
}
var offers = [];
var interval_place_dectetion = -1;
var Availability = [];

function sort_offers(data) {
    var sorted_list = [];

    $.each(data, function (i, item) {
        if (item.id > 0)
            sorted_list.push(item);

    })
    $.each(data, function (i, item) {
        if (item.id < 0)
            sorted_list.push(item);

    })

    return sorted_list;
}
function set_slider_trip_value() {


    if ($("#calc_method").prop("checked") == false) {
        if ($("#trip_method").val() != "TLD") {


            $("#trip-value-estimation").slider({
                range: "max",
                min: 10,
                max: 200,
                value: 10,
                step: 10,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' KM').change();
                }
            });


        }
        else {
            $("#trip-value-estimation").slider({
                range: "max",
                min: 200,
                max: 2000,
                value: 200,
                step: 50,
                slide: function (event, ui) {

                    $("#trip-value-estimation-value").text(ui.value + ' KM').change();
                }
            });

        }

        $("#trip-value-estimation-value").text($("#trip-value-estimation").slider("value") + ' KM');
    }

}
//init date field in form
function init_date_fields() {

    //init date
    var now = new Date();

    $("#departing_date").val(parse_date(now).substr(0, 10).replace('/', '-').replace('/', '-')).change()
    
    
    var HOURS = now.getHours();
    if (HOURS < 10)
        HOURS = '0' + HOURS;

    var MINUTES = now.getMinutes();
    if (MINUTES < 10)
        MINUTES = '0' + MINUTES;


    var time = HOURS + ':' + MINUTES;
    $(".time input").val(time).change().attr("value", time);

    $('.time').clockpicker();




}


function set_available_drivers_table() {


    $('#available_drivers').jtable({
        title: 'Drivers',
        actions: {
            listAction: function (postData, jtParams) {

                return $.Deferred(function ($dfd) {


                    var trip_info = new Object();
                    trip_info.departing = get_departing();
                    trip_info.arrival = get_arrival();
                    trip_info.time = $("#departing_date").val() + ' ' + $(".time input").val() + ':00';
                    trip_info.cars = true;

                    $.ajax({
                        url: 'drivers/trip/find?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                        type: 'POST',
                        dataType: 'json',
                        data: trip_info,
                        success: function (data) {
                            $dfd.resolve(data);
                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            }
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {

            prev: {
                title: 'Previous Place',
                width: '20%',
                display: function (data) {
                    return data.record.prev.location;
                }
            },

            next: {
                title: 'Next Place',
                width: '10%',
                display: function (data) {
                    return data.record.next.location;
                }
            },
            time: {
                title: 'Time',
                width: '10%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.original_distance / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.original_time / 60).toFixed(2) + 'min';

                }
            },
            distance_to_departing: {
                title: 'To START',
                width: '20%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.distance_to_departing / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.time_to_departing / 60).toFixed(2) + 'min';
                }
            },
            distance_to_arrival: {
                title: 'To END',
                width: '20%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.distance_to_arrival / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.time_to_arrival / 60).toFixed(2) + 'min';
                }
            },
            distance_to_next: {
                title: 'to NEXT',
                width: '40%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.distance_to_next / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.time_to_next / 60).toFixed(2) + 'min';
                }
            },

            new_distance: {
                title: 'Total',
                width: '20%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.new_distance / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.new_time / 60).toFixed(2) + 'min';
                }
            },
            total_distance_plus: {
                title: 'Will do More',
                width: '20%',
                display: function (data) {
                    return 'dist: ' + parseFloat(data.record.total_distance_plus / 1000).toFixed(2) + 'KM  ' + ' time: ' + parseFloat(data.record.total_time_plus / 60).toFixed(2) + 'min';
                }
            }


        },

        selectionChanged: function () {

            //selected_row = $('#customers').jtable('selectedRows').data('record');
            //console.log(selected_row);
            //view('/customers/' + selected_row.id + '/dashboard');

        }
    });


    $("#available_drivers").jtable('load');


}

function get_trip_details() {

    var trip_info = new Object();
    trip_info.departing = get_departing();
    trip_info.arrival = get_arrival();
    trip_info.time = $("#departing_date").val() + ' ' + $(".time input").val() + ':00';

    return 'drivers/trip/find?departing=' + trip_info.departing + '&arrival=' + trip_info.arrival + '&time=' + trip_info.time;

}

function get_departing() {

    return document.getElementById("departing").value;

}


function get_arrival() {

    return document.getElementById("arrival").value;

}