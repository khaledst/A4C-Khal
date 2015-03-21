/// <reference path="../../js/jquery-2.1.0-vsdoc.js" />
var departing = null;
var arrival = null;
var mode = null;


$(document).ready(function () {
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


    $('#rootwizard').bootstrapWizard({

        onNext: function (tab, navigation, index) {
            console.log(index);
           

            if (index == 2) {
               var validator = $(".trip").validate();
                validator.form();

                
            if (validator.errorList.length == 0) 
            {
                
                 get_tarifs();




            }
                else
            return false;
            }

          

        }, onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#rootwizard').find('.bar').css({ width: $percent + '%' });

            //console.log($current);
               console.log(index);
            $('.finish').hide();
            if ($current == 6) {
                $('.finish').show();
            } else {
                $('.finish').hide();
            }
       


        }, onFinish: function (tab, navigation, index) {




        }

    });



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



     map_init();
       myParaxify = paraxify('.paraxify');

})


var tripz = null;

var interval_place_dectetion = -1;
function get_tarifs()
{
      $("#offers-container").fadeOut(200);

                var trip = new Object();
                var time = $("#departing_date").val() + ' ' + $("[name='time']").val() + ':00';
                trip.departing = $("#departing").val();
                trip.departing_time = time;
                trip.calc_method = ($("#calc_method").prop("checked")) ? 1 : 0;
                trip.value =1;
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
                            tripz = trip;

                            $.get("drivers/find", trip).done(function (data) {

                                Availability = JSON.parse(data);
                                offers = Availability.offers;

                                setTimeout(function () {
                                    $("#offers-container").find(".offer-ui").remove();
                                    $("#offers-container").fadeIn();


                                    $.each(Availability.offers, function (i, offer) {

                                        var existing_offer = $("#offers-container").find(".offer-ui[id=" + offer.id + "]");
                                      
                                        if (existing_offer.length == 0 || existing_offer.length > 0  & existing_offer.attr("id") < 0) {
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

                                            $("#offers-container").append(offer_ui_example);
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

function map_init()
{ 

    google.maps.event.addDomListener(window, 'load', init);
                var map;
                function init() {
                    var mapOptions = {
                        center: new google.maps.LatLng(48.859747,2.45853),
                        zoom: 14,
                        zoomControl: false,
                        disableDoubleClickZoom: false,
                        mapTypeControl: false,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        },
                        scaleControl: false,
                        scrollwheel: false,
                        panControl: false,
                        streetViewControl: false,
                        draggable : false,
                        overviewMapControl: false,
                        overviewMapControlOptions: {
                            opened: false,
                        },
                        mapTypeId: google.maps.MapTypeId.TERRAIN,
                        styles: [
                {
                  featureType: "landscape",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 65 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "poi",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 51 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road.highway",
                  stylers: [
                    { saturation: -100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road.arterial",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 30 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "road.local",
                  stylers: [
                    { saturation: -100 },
                    { lightness: 40 },
                    { visibility: "on" }
                  ]
                },{
                  featureType: "transit",
                  stylers: [
                    { saturation: -100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "administrative.province",
                  stylers: [
                    { visibility: "off" }
                  ]
              /** /
                },{
                  featureType: "administrative.locality",
                  stylers: [
                    { visibility: "off" }
                  ]
                },{
                  featureType: "administrative.neighborhood",
                  stylers: [
                    { visibility: "on" }
                  ]
              /**/
                },{
                  featureType: "water",
                  elementType: "labels",
                  stylers: [
                    { visibility: "on" },
                    { lightness: -25 },
                    { saturation: -100 }
                  ]
                },{
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [
                    { hue: "#ffff00" },
                    { lightness: -25 },
                    { saturation: -97 }
                  ]
                }
              ],
                    }
                    var mapElement = document.getElementById('map');
                    var map = new google.maps.Map(mapElement, mapOptions);
                    var locations = [
            ['Prestige Limousine', '12, Rue Ernest Renann <br />93100 - Montreuil', '06 29 23 54 38', 'piere.dupont@lp.fr', 'undefined', 48.8559983, 2.4588842, 'https://mapbuildr.com/assets/img/markers/ellipse-purple.png']
                    ];
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
                        if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
                        if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
                       if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
                       if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
                        marker = new google.maps.Marker({
                            icon: markericon,
                            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                            map: map,
                            title: locations[i][0],
                            desc: description,
                            tel: telephone,
                            email: email,
                            web: web
                        });
            link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
                 }
             function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
                  var infoWindowVisible = (function () {
                          var currentlyVisible = false;
                          return function (visible) {
                              if (visible !== undefined) {
                                  currentlyVisible = visible;
                              }
                              return currentlyVisible;
                           };
                       }());
                       iw = new google.maps.InfoWindow();
                       google.maps.event.addListener(marker, 'click', function() {
                           if (infoWindowVisible()) {
                               iw.close();
                               infoWindowVisible(false);
                           } else {
                               var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p><p>"+telephone+"<p><a href='mailto:"+email+"' >"+email+"<a></div>";
                               iw = new google.maps.InfoWindow({content:html});
                               iw.open(map,marker);
                               infoWindowVisible(true);
                           }
                    });
                    google.maps.event.addListener(iw, 'closeclick', function () {
                        infoWindowVisible(false);
                    });
             }
            }
}