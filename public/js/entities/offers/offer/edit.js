var departing = null;
var arrival = null;
var mode = null;

$(document).ready(function () {

    departing = new google.maps.places.Autocomplete(document.getElementById('departing'));
    google.maps.event.addListener(departing, 'place_changed', function () {
        var place = departing.getPlace();
        var address = place.formatted_address;
        $("#departing").data("lat", place.geometry.location.lat())
        $("#departing").data("lng", place.geometry.location.lng());

    });


    arrival = new google.maps.places.Autocomplete(document.getElementById('arrival'));
    google.maps.event.addListener(arrival, 'place_changed', function () {

        var place = arrival.getPlace();
        var address = place.formatted_address;
        $("#arrival").data("lat", place.geometry.location.lat())
        $("#arrival").data("lng", place.geometry.location.lng())

    });

    //set tabs
    active_tabs('tabs');


    //form inicialization
    form_inicialization();


    var offer_id = $(".offer").data("id");
    if (offer_id.length == 0)
        offer_id = -1;

    load_timesheet(offer_id, 'offers/timesheet/');

   

});




//form inicialization
function form_inicialization() {

    img_upload_interval = 0;
    //get form Mode
    mode = $(".offer").data("mode");
    role = $(".offer").data("role");
    //type de parcours
    //TZG -> trajeect ZOne Geografique
    //TAB -> traject A a B
    //TLD -> traject longue distance
    $(".offer").data("trip", "TZG");
    $(".arrival_group").slideUp();

    //active switch
    $("#check-active").bootstrapSwitch();
    set_switch($("#check-active"));


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

    set_upload();

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
                        'change': function (v) { }
                    });


                    var upload_interval = 0;
                    setInterval(function () {

                        upload_interval = upload_interval + 1;
                        $('.upload_status').attr("value").change();
                        if (i > 100)
                            clearInterval(upload_interval);

                    })


                    $(".upload_status").fadeOut();
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



    //when mode set controls that are possible t o bind by blade sintax such (combobox)

    if (mode == "edit") {

        var trip_method_selected = $("#trip_method").data("value");
        $("#trip_method").val(trip_method_selected).change();


        var calc_method_selected = $("#calc_method").data("value");
        $("#calc_method").val(calc_method_selected).change();

        //set departing radius
        set_slider("radiusd");
        set_slider("radiusa");

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

            var drivers = $(".offer").find("#drivers").find(".active");
            drivers = get_array_by_attribute(drivers, 'id', get_offer_driver, 'driver_id');

            var cars = $(".offer").find("#cars").find(".active");
            cars = get_array_by_attribute(cars, 'id', get_offer_car, 'car_id');


            if (role == 'super-admin') {
                offer.company_id = $(".offer").find("#company_id").val();
            }
            else
                offer.company_id = -1;



            var formData = new FormData();
            formData.append("offer", JSON.stringify(offer));
            formData.append("drivers", JSON.stringify(drivers));
            formData.append("cars", JSON.stringify(cars));
            formData.append("timesheet", JSON.stringify(get_time_table()));

            var files = $(".input_file_img_preview").prop('files');
            if (files.length > 0) {
                var file = $(".input_file_img_preview").prop('files')[0];
                formData.append("img", file);
            }

            $.ajax({
                url: "offers/save",
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (XHR) {
                },
                success: function (data) {
                    var status = JSON.parse(data);
                    parse_status(status);

                    if (status.result) {

                        view("offers/dashboard");
                    }
                },
                error: function () {

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








