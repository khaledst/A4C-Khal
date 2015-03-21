var events = [];

$(document).ready(function () {

    get_events();

});

function get_events() {
    var api = "";

    if (is_customer)
        api = 'customers/bookings/' + customer_id + '/all/customer';
    else
        api = 'drivers/bookings/' + driver_id + '/all/driver';

    events = [];
    $.post(api).done(function (data) {
        data = JSON.parse(data);
        events = data.Records;

        set_calendar_ui(events);
    }).error(function () {


    })

}
var m = moment();

function set_calendar_ui(_events) {
    $("#calender-prev").click(function () {
        $('#calendar').fullCalendar('prev');
        set_date();
    })

    $("#calender-next").click(function () {
        $('#calendar').fullCalendar('next');
        set_date();
    })


    $(".changeview label").click(function () {
        $('#calendar').fullCalendar('changeView', $(this).find("input").val());
        set_date();
    });

    set_date = function () {
        var selectedDate = $('#calendar').fullCalendar('getDate');
        $('.selected-day').html($.fullCalendar.formatDate(selectedDate, "dddd"));
        $('.selected-date').html($.fullCalendar.formatDate(selectedDate, "dd MMMM yyyy"));
        $('.selected-year').html($.fullCalendar.formatDate(selectedDate, "yyyy"));

    }

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        height: 700,
        header: false,
        editable: true,
        droppable: true,
        drop: function (date, allDay) { // this function is called when something is dropped
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            copiedEventObject.className = 'event-danger';

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
        },
        events: _events,
        eventRender: function (event, element) {

            $(".selected-day").text();
            element.find('#date-title').html(element.find('span.fc-event-title').text());
        }
    });

    set_date();

}




function bind_booking(interval, api) {

    $('#' + interval + ' .bookings').jtable({
        title: 'MY' + interval.uppercase + ' BOOKINGS',
        actions: {
            listAction: function (postData, jtParams) {

                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: api + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                        type: 'POST',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {
                            $dfd.resolve(data);
                            $('[data-tab="' + interval + '"]').find(".total").text(data.TotalRecordCount);

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

            booking: {
                title: 'Description',
                width: '40%',
                display: function (data) {



                    return get_course_details(data.record).title;
                }
            },
            departing_date: {
                title: 'Departing Time',
                width: '20%',
                display: function (data) {
                    return data.record.departing_date;
                }
            },
            status: {
                title: 'Status',
                width: '20%',
                display: function (data) {
                    return get_course_details(data.record).status;
                }
            }
        },

        selectionChanged: function () {



        }
    });
    $('#' + interval + ' .bookings').jtable('load');

}

function get_course_details(data) {

    var trip_details = new Object();
    console.log(data);
    switch (data.trip_method) {
        case 'TZG':
            {
                switch (data.calc_method) {

                    case '1':
                        {

                            if (data.arrival_address != null && data.arrival_address.length > 0)
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address;
                        }
                        break;
                    case '2':
                        {
                            if (data.arrival_address != null && data.arrival_address.length > 0)
                                trip_details.title = 'Traject à la minute depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject à la minute depuis ' + data.departing_address;
                        }
                        break;
                }

            }
            break;
        case 'TLD':
            {
                switch (data.calc_method) {

                    case '1':
                        {

                            if (data.arrival_address != null && data.arrival_address.length > 0)
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address;
                        }
                        break;
                    case '2':
                        {
                            if (data.arrival_address != null && data.arrival_address.length > 0)
                                trip_details.title = 'Traject à la minute depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject à la minute depuis ' + data.departing_address;
                        }
                        break;
                }

            }
            break;

        case 'TAB':
            {
                switch (data.calc_method) {

                    case '1':
                        {
                            trip_details.title = 'Traject au KM depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                        }
                        break;
                    case '2':
                        {
                            trip_details.title = 'Traject à la minute depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                        }
                        break;
                    case '3':
                        {
                            trip_details.title = 'Traject Prix Fixe depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                        }

                        break;
                }

            }

    }

    var now = new Date();
    var departing_date = new Date(data.departing_date);


    if (departing_date > now) {
        console.log("to be");
        var diference = departing_date.getTime() - now.getTime();
        diference = diference / 1000 / 60;
        if (diference < 15)
            trip_details.status = "LESS THAN 15 MIN";
        else
            trip_details.status = Math.round(diference).toFixed(0) + ' MIN LEFT';

    }
    else {

        //STATUS WIL BE SET AT WITH CODE ON BOOKINS, MEANS 
        //AT BOOKING DEFAULT STATUS WILL BE 3
        // 3 USER WILL BE PICKED
        // 4 USER NOT THERE
        // IF STATUS 3 AFTER COURSE MENS DRIVER NT ARRIVED AT TIME
        // 2 COURSE WAS STARTED
        // 1 COURSE FINNISH PASSENGER WAS DELIVERED IN PLACE

        switch (data.status) {
            case 1:
                trip_details.status = "FINISHED";
                break;
            case 2:
                trip_details.status = "STARTED";
                break;
            case 3:
                trip_details.status = "DRIVER NOT ARRIVED";
                break;
            case 4:
                trip_details.status = "CUSTOMER NOT IN PLACE";
                break;
        }
    }
    console.log(trip_details.status);
    return trip_details;

}