var company = new Object();
company.name = "blablabla";
company.lat = 49.599224;
company.lng = 6.133164999999963
company.location = 'Luxembourg Gare Centrale quai 13, Luxemburgo';

var directionsDisplay;
var map;
var directionsService;
var current_route = null;
var p = null;

var locations = [];
var drivers = [];
var drivers_available = [];
var directions_displays = [];

var trip_directionsDisplay = null;

$(document).ready(function () {

    directionsService = new google.maps.DirectionsService();
    initialize();


    var start = new google.maps.places.Autocomplete(document.getElementById('start'));
    google.maps.event.addListener(start, 'place_changed', function () {

        var place = start.getPlace();
        var address = place.formatted_address;
        $('#start_coordinates').text('Latitude: ' + place.geometry.location.lat() + ' | Longitude: ' + place.geometry.location.lng());

    });

    var end = new google.maps.places.Autocomplete(document.getElementById('end'));
    google.maps.event.addListener(end, 'place_changed', function () {

        var place = end.getPlace();
        var address = place.formatted_address;

        $('#end_coordinates').text('Latitude: ' + place.geometry.location.lat() + ' | Longitude: ' + place.geometry.location.lng());
    });


    // find using server processing

    $("[data-action='find-api']").click(function () {

        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;

        var departing_date = $("#date_start").val() + ' ' + $(".time input").val() + ':00';

        var trip_object = new Object();
        trip_object.departing = start;
        trip_object.arrival = end;
        trip_object.time = departing_date;

        $.get('drivers/trip/find', trip_object).done(function (data) {


            console.log(data);



        })

        return false;

    })

    //START DRAWING TRIP AND FINDING DRIVERS
    $("[data-action='find']").click(function () {
        //clear interval for displaing makers of type driver
        clearInterval(interval_display_driver);

        $(directions_displays).each(function (i, item) {
            item.setMap(null)
        })


        CURRENT_DISTANCE_TRIP = 0;
        CURRENT_TIME_TRIP = 0;
        index = 0;
        markers = [];
        m_drivers = [];
        removeMarkers()
        locations = [];
        drivers_available = [];
        drivers = [];
        calc_driver_route_index = 0;
        current_route_calculated = 0;
        calcRoute();
        return false;
    })

    //init date
    var now = new Date();

    $("#date_start").val(parse_date(now).substr(0, 10).replace('/', '-').replace('/', '-')).change()
    var HOURS = now.getHours();
    if (HOURS < 10)
        HOURS = '0' + HOURS;

    var MINUTES = now.getMinutes();
    if (MINUTES < 10)
        MINUTES = '0' + MINUTES;


    var time = HOURS + ':' + MINUTES;
    $(".time input").val(time).change().attr("value", time);

    $('.time').clockpicker();

});

var colors = ['red', 'blue', 'green', 'cyan'];
var colors_routes = ['#FF9B9B', '#92BFD7', '#94E594', '#96FFFF'];

var CURRENT_DISTANCE_TRIP = 0;
var CURRENT_TIME_TRIP = 0;
var routes = [];
var calc_driver_route = false;
var index = 0;
var ddate = null;
var adate = null;

var routes2 = [];
function calcRoute() {
    //restart routes
    routes = [];
    directions_displays = [];

    var rendererOptions = {
        preserveViewport: false,
        suppressMarkers: true,
        routeIndex: 0,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };


    var trip_directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    trip_directionsDisplay.setMap(map);
    trip_directionsDisplay.setPanel(document.getElementById("directionsPanel"));


    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };

    directionsService.route(request, function (result, status) {


        if (status == google.maps.DirectionsStatus.OK) {

            if (result.routes != undefined && result.routes.length > 0) {

                current_route = best_route(result.routes)

                CURRENT_DISTANCE_TRIP = parseFloat(current_route.legs[0].distance.value) / 1000;
                CURRENT_TIME_TRIP = parseFloat(current_route.legs[0].duration.value);
                console.log("CURRENT_DISTANCE: " + CURRENT_DISTANCE_TRIP);

                var departing_date = $("#date_start").val();
                ddate = departing_date + ' ' + $(".time input").val() + ':00';
                adate = sum_to_date(ddate, (current_route.legs[0].duration.value));
                adate = parse_date(adate);

                var data = { time: new Date(ddate), driver: 'finding', type: 'start', tag: 'Current' };
                locations.push(get_location(current_route.legs[0].start_location.lat(), current_route.legs[0].start_location.lng(), data));

                var data = { time: new Date(adate), driver: 'finding', type: 'end', tag: 'Current' };

                locations.push(get_location(current_route.legs[0].end_location.lat(), current_route.legs[0].end_location.lng(), data));

                trip_directionsDisplay.setDirections(result);
                directions_displays.push(trip_directionsDisplay);

                //GET drivers  with slots available for hte current routes
                //draw first route after current route slot
                //draw last route before current route
                // this routes are need to know wich driver is more close
                //

                var company_position = { location: company.location, lat: company.lat, lng: company.lng };



                $.get('drivers/find/availablibility', { departing_date: ddate, arrival_date: adate }).done(function (data) {



                    drivers = JSON.parse(data);
                    $(".available_drivers ul").empty();


                    $(drivers).each(function (i, item) {
                        index++;
                        //set driver info
                        var driver_info = available_driver_info();
                        driver_info.info = item;
                        driver_info.last_position = company_position;
                        driver_info.next_position = company_position;


                        var color = colors[i];
                        var li = $("<li><div class='name'></div><div class='status'></div></li>");
                        li.find('.name').text(item.user.first_name + ' ' + item.user.last_name);
                        $(".available_drivers ul").append(li);

                        var book_date = new Date($("#date_start").val());
                        var d = new Date();
                        var last_trip_departing = d.toJSON().substr(0, 10) + ' ' + item.star;
                        var next_trip_departing = d.toJSON().substr(0, 10) + ' ' + item.end;



                        // cheack if drivers as bookings
                        if (item.bookings.length > 0) {


                            //check if thre is routes before for the curren driver
                            var bookings_before = item.bookings.reverse().filter(function (item) {

                                var trip_end_date_time = new Date(item.arrival_date);
                                var trip_date = parse_date(trip_end_date_time).substr(0, 10)
                                // console.log(trip_date);

                                var departing_date_time = new Date(ddate);
                                //console.log('last trip end :' + trip_end_date + '- current departing' + departing_date);
                                if (trip_end_date_time < departing_date_time && trip_date == departing_date) {

                                    return item;
                                }
                            });

                            if (bookings_before.length > 0) {



                                //this is the last route for google maps
                                DrawRoute(bookings_before[0].departing_address, bookings_before[0].arrival_address, index, color, bookings_before);

                                //alert(item.id);
                                //alert(bookings_before[0].arrival_address);

                                //this is the infomation from the driver last position for app
                                var position = { location: bookings_before[0].arrival_address, lat: bookings_before[0].arrival_point_lat, lng: bookings_before[0].arrival_point_lng, departing_time: new Date(bookings_before[0].arrival_date) };
                                driver_info.last_position = position;

                            }
                            else {

                                var current_date = new Date();
                                var working_hours = new Date(current_date.toJSON().substr(0, 10) + ' ' + item.start)

                                //this is the last route for google maps
                                var data = { time: working_hours, driver: item.id, type: 'start', tag: 'garage', departing_time: new Date(last_trip_departing) };
                                locations.push(get_location(company.lat, company.lng, data));


                                //this is the infomation from the driver last position for app
                                var position = { location: company.location, lat: company.lat, lng: company.lng, departing_time: new Date(next_trip_departing) };
                                driver_info.last_position = position;
                                DrawRoute(null, null, index, null, null);
                            }


                            //console.log('checking after');
                            //check if there is route after the arrival date for the current driver
                            var bookings_after = item.bookings.filter(function (item) {

                                var next_trip_driver_arrival_date = new Date(item.driver_arrival_time);

                                var trip_date = parse_date(next_trip_driver_arrival_date).substr(0, 10)
                                //arrival date
                                var arrival_date_time = new Date(adate);


                                //  alert(next_trip_driver_arrival_date + ' - ' + arrival_date_time );
                                //alert(trip_date + ' - ' + departing_date);


                                if (next_trip_driver_arrival_date > arrival_date_time && trip_date == departing_date) {

                                    //console.log('next start date: ' + next_trip_driver_arrival_date + '  driver_id' + item.driver_id)
                                    //console.log('current arrival:' + arrival_date + '- next trip departing' + next_trip_driver_arrival_date);
                                    return item;


                                }
                            });

                            if (bookings_after.length > 0) {
                                //console.log("after");
                                //console.log('FROM ' + bookings_after[0].departing_address + 'TO ' + bookings_after[0].arrival_address);

                                DrawRoute(bookings_after[0].departing_address, bookings_after[0].arrival_address, index, color, bookings_after);

                                var d = new Date();

                                var position = { location: bookings_after[0].departing_address, lat: bookings_after[0].departing_point_lat, lng: bookings_after[0].departing_point_lng, arrival_time: new Date(bookings_after[0].driver_arrival_time) };
                                driver_info.next_position = position;

                                //set driver info 


                            } else {

                                var current_date = new Date();
                                var working_hours = new Date(current_date.toJSON().substr(0, 10) + ' ' + item.end)


                                //this is the next route for google maps
                                var data = { time: working_hours, driver: item.id, type: 'end', tag: 'end0', arrival_time: new Date(next_trip_departing) };
                                locations.push(get_location(company.lat, company.lng, data));


                                //this is the infomation from the driver next position for app
                                var position = { location: company.location, lat: company.lat, lng: company.lng, arrival_time: new Date(next_trip_departing) };
                                driver_info.next_position = position;
                                DrawRoute(null, null, index, null, null);
                            }



                            drivers_available.push(driver_info);

                        }
                        else {


                            drivers_available.push(driver_info);

                            //if there is no trips on a driver it means that is on garage so i have to put the time as time working hours

                            var current_date = new Date();
                            var working_hours = new Date(current_date.toJSON().substr(0, 10) + ' ' + item.start)

                            var data = { time: working_hours, driver: item.id, type: 'start', tag: 'garage', departing_time: new Date(last_trip_departing) };
                            locations.push(get_location(company.lat, company.lng, data));

                            var data = { time: working_hours, driver: item.id, type: 'end', tag: 'end0', arrival_time: new Date(next_trip_departing) };
                            locations.push(get_location(company.lat, company.lng, data));

                            DrawRoute(null, null, index, null, null);
                        }




                    })
                });

            }
        }
    });
}




var check_route_drawin_status = null;



function DrawRoute(departing, arrival, index, color, booking) {



    if (departing != null) {

        var rendererOptions = {
            preserveViewport: true,
            suppressMarkers: true,
            routeIndex: index,
            polylineOptions: {
                strokeColor: color
            }

        };



        var request = {
            origin: departing,
            destination: arrival,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        };


        var directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions);
        directionsDisplay3.setMap(map);


        directionsService.route(request, function (result, status) {


            if (status == google.maps.DirectionsStatus.OK) {


                if (result.routes != undefined && result.routes.length > 0) {
                    var new_route = best_route(result.routes);

                    var data = { time: new Date(booking[0].driver_arrival_time), driver: booking[0].driver_id, type: 'start', tag: 'garage' };
                    locations.push(get_location(new_route.legs[0].start_location.lat(), new_route.legs[0].start_location.lng(), data));

                    var data = { time: new Date(booking[0].arrival_date), driver: booking[0].driver_id, type: 'end', tag: 'end' };
                    locations.push(get_location(new_route.legs[0].end_location.lat(), new_route.legs[0].end_location.lng(), data));
                }
                directionsDisplay3.setDirections(result);
                directions_displays.push(directionsDisplay3);

                setTimeout(function () {


                    if (index == drivers.length) {

                        calc_best_driver_for_trip(0);
                    }

                });
            }
        });

    }
    else {


        if (index == drivers.length) {


            calc_best_driver_for_trip(0);
        }

    }

}



function calc_best_driver_for_trip(c_index) {


    var driver = drivers_available[c_index];

    console.log("calculating best toute for :" + driver.info.user.first_name);

    console.log(colors_routes[c_index]);
    var color = null;
    var rendererOptions = {
        preserveViewport: true,
        suppressMarkers: true,
        routeIndex: index,
        polylineOptions: {
            strokeColor: colors_routes[c_index],
            strokeOpacity: 0.5
        }

    };


    var DISTANCE_ORIGINAL = 0;
    var DISTANCE_TO_TRIP = 0;
    var DISTANCE_AFTER_TRIP = 0;




    console.log("calc new routes for " + driver.info.user.first_name)
    rendererOptions.polylineOptions.strokeColor = colors[c_index];


    // LAT ROUTE TO NEXT ROUTE OF DRIVER....
    var request0 = {
        origin: driver.last_position.location,
        destination: driver.next_position.location,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };

    var directionsDisplay0 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay0.setMap(map);



    directionsService.route(request0, function (result, status) {


        if (status == google.maps.DirectionsStatus.OK) {
            var route_to_trip = best_route(result.routes);

            locations.push(get_location(route_to_trip.legs[0].start_location.lat(), route_to_trip.legs[0].start_location.lng(), null));
            locations.push(get_location(route_to_trip.legs[0].end_location.lat(), route_to_trip.legs[0].end_location.lng(), null));

            console.log("ORIGINAL ROUTE");
            console.log(route_to_trip);
            DISTANCE_ORIGINAL = parseFloat(route_to_trip.legs[0].distance.value) / 1000;

            directionsDisplay0.setDirections(result);
            directions_displays.push(directionsDisplay0);




            var request1 = {
                origin: driver.last_position.location,
                destination: $("#start").val(),
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true

            };


            var directionsDisplay1 = new google.maps.DirectionsRenderer(rendererOptions);
            directionsDisplay1.setMap(map);

            directionsService.route(request1, function (result, status) {


                if (status == google.maps.DirectionsStatus.OK) {
                    var route_to_trip = best_route(result.routes);

                    DISTANCE_TO_TRIP = parseFloat(route_to_trip.legs[0].distance.value) / 1000;
                    TIME_TO_NEW_TRP = parseFloat(current_route.legs[0].duration.value);

                    console.log("TO THE NEW TRIP IS:" + DISTANCE_TO_TRIP);
                    locations.push(get_location(route_to_trip.legs[0].start_location.lat(), route_to_trip.legs[0].start_location.lng(), null));
                    locations.push(get_location(route_to_trip.legs[0].end_location.lat(), route_to_trip.legs[0].end_location.lng(), null));
                    console.log("FROM LAST LOCATIONS TO THE NEWS LOCATION");
                    console.log(route_to_trip);

                    //driver.last_position.location.departing_time
                    //var time_date = sum_to_date(ddate, (current_route.legs[0].duration.value));

                    var trip_arrival_time = sum_to_date(driver.last_position.departing_time, TIME_TO_NEW_TRP)
                    console.log("arrived time" + trip_arrival_time);
                    directionsDisplay1.setDirections(result);
                    directions_displays.push(directionsDisplay1);

                    var request2 = {
                        origin: $("#end").val(),
                        destination: driver.next_position.location,
                        travelMode: google.maps.TravelMode.DRIVING,
                        provideRouteAlternatives: true
                    };


                    var trip_departing_time = sum_to_date(driver.last_position.departing_time, TIME_TO_NEW_TRP)

                    var trip_end_time = sum_to_date(trip_arrival_time, CURRENT_TIME_TRIP);


                    if (trip_arrival_time > new Date(ddate) || new Date(adate) > driver.next_position.arrival_time) {

                        alert("not time to arrive to current the trip");
                    }



                    var directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions);
                    directionsDisplay2.setMap(map);


                    directionsService.route(request2, function (result, status) {


                        if (status == google.maps.DirectionsStatus.OK) {
                            var route_to_trip = best_route(result.routes);

                            locations.push(get_location(route_to_trip.legs[0].start_location.lat(), route_to_trip.legs[0].start_location.lng(), null));
                            locations.push(get_location(route_to_trip.legs[0].end_location.lat(), route_to_trip.legs[0].end_location.lng(), null));

                            console.log("DISATANCE AFTER  TRIP");
                            console.log(route_to_trip);
                            DISTANCE_AFTER_TRIP = parseFloat(route_to_trip.legs[0].distance.value) / 1000;

                            var TIME_AFTER_TRIP = parseFloat(route_to_trip.legs[0].duration.value);


                            console.log(DISTANCE_AFTER_TRIP);

                            console.log("ORIGINAL TRIP DISTANCE: " + DISTANCE_ORIGINAL);
                            console.log("ROUTE TO NEW TRIP: " + DISTANCE_TO_TRIP);
                            console.log("TRIP DISTANCE: " + CURRENT_DISTANCE_TRIP);
                            console.log("AFTER TRIP DISTANCE: " + DISTANCE_AFTER_TRIP);

                            var NEW_DISTANCE_TRIP = DISTANCE_TO_TRIP + CURRENT_DISTANCE_TRIP + DISTANCE_AFTER_TRIP;
                            console.log("DISTANCE IF ACCEPT: " + NEW_DISTANCE_TRIP);
                            console.log("TOTAL DISTANCE MORE: " + parseFloat(NEW_DISTANCE_TRIP - DISTANCE_ORIGINAL));


                            if (c_index < (drivers_available.length - 1)) {

                                setTimeout(function () {

                                    calc_best_driver_for_trip(c_index + 1);
                                }, 3000);

                            }

                            var trip_arrival_time = new Date(driver.next_position.arrival_time);

                            var driver_arrival_time = sum_to_date(adate, CURRENT_TIME_TRIP);


                            if (driver_arrival_time > trip_arrival_time) {

                                alert("not time to arrive to  next the trip");
                            }




                            directionsDisplay2.setDirections(result);
                            directions_displays.push(directionsDisplay2);


                            setTimeout(function () {

                                center_map();
                            }, 200);
                        }
                    });

                }
            });






        }
    });







}



var my_routes = [];
var markers = [];
var interval_display_driver = null;
var index_driver = 0;
var m_drivers = [];
function center_map() {
    index_driver = 0;

    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    labels_class = "labels";

    m_drivers = [];
    $(locations).each(function (i, location) {
        var label = "";

        var driver_name = "";

        var type = "Dep:";

        var flag = 'img/flags/flag_depart.png';

        if (location.data != null) {

            if (location.data.tag == "garage") {

                flag = 'img//driver.png';
                if (location.data.type == 'start') {


                    labels_class = "driver";
                    label = "D" + location.data.driver + parse_date(location.data.time).substr(10, 15);


                }
                if (location.data.type == 'end') {
                    type = "Arr:";
                    flag = null;
                    labels_class = "none";
                    label = "D" + location.data.driver + parse_date(location.data.time).substr(10, 15);

                    if (location.data.tag == "end0")
                        label = "";

                }



            }
            else {

                if (location.data.type == 'end') {
                    type = "Arr:";
                    flag = 'img/flags/flag_arrive.png';
                }


                if (location.data.tag == "Current") {
                    label = parse_date(location.data.time).substr(10, 15);

                    if (location.data.type == 'end')
                        flag = 'img/flags/flag_c_arrive.png';
                    else
                        flag = 'img/flags/flag_c_depart.png';
                }
                else
                    label = "D" + location.data.driver + parse_date(location.data.time).substr(10, 15);

            }





        }
        else
            labels_class = "none";

        if (label == "")
            labels_class = "none";

        //if (location.data != null) {
        //    console.log("label_class:" + labels_class + "---" + "location type:" + location.data.type + '---- TAG:' + location.data.tag + ' Text:' + label);

        var marker = new MarkerWithLabel({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
            icon: flag,
            labelContent: label,
            labelAnchor: new google.maps.Point(22, 0),
            labelClass: labels_class // the CSS class for the label
        });


        if (location.data == null) {

            marker.visible = false;

        }


        if (location.data != null && location.data.tag == "garage" && location.data.type == 'start') {


            m_drivers.push(marker);
        }

        markers.push(marker);
        //extend the bounds to include each marker's position
        bounds.extend(marker.position);

        //google.maps.event.addListener(marker, 'click', (function (marker, i) {
        //    return function () {
        //        infowindow.setContent(locations[i][0]);
        //        infowindow.open(map, marker);
        //    }
        //})(marker, i));
    });

    map.fitBounds(bounds);




    if (interval_display_driver != null)
        clearInterval(interval_display_driver);


    interval_display_driver = setInterval(function () {

        set_visible(m_drivers[index_driver]);
        index_driver++;
        if (index_driver == m_drivers.length)
            index_driver = 0;
    }, 1000);


}


function set_visible(marker) {

    $(m_drivers).each(function () { this.setVisible(false); })
    marker.setVisible(true);

}


function get_location(lat, lng, data) {
    var location = new Object();
    location.lat = lat;
    location.lng = lng;
    location.data = data;
    return location;
}

function available_driver_info() {
    var available_driver = new Object();
    available_driver.info = null;
    available_driver.last_position = null;
    available_driver.next_position = null;
    return available_driver;

}

function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


function sum_to_date(date_str, seconds) {
    var date = new Date(date_str);
    date = new Date(date.getTime() + (seconds * 1000))
    return date;
}

function parse_date(date) {

    var minutes = date.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;

    var hours = date.getHours();
    if (hours < 10)
        hours = '0' + hours;

    var seconds = date.getSeconds();
    if (seconds < 10)
        seconds = '0' + seconds;

    var date = date.toJSON().substring(0, 10) + ' ' + hours + ':' + minutes + ':' + seconds;
    return date;
}


function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();

    var luxembourg = new google.maps.LatLng(49.599224, 6.133165);
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: luxembourg
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

}