var customer_id = null;
$(document).ready(function () {

    customer_id = $('.interval-list').data("customer-id");
    active_tabs('.customer-tabs');
    bind_booking_day()


});


function bind_booking_day() {


    $('.bookings_day').jtable({
        title: 'MY DAYLY BOOKINGS',
        actions: {
            listAction: 'customers/bookings/' + customer_id + '/day/'
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
    $(".bookings_day").jtable('load');

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

                            if (data.arrival_address != null  && data.arrival_address.length > 0)
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address;
                        }
                        break;
                    case '2':
                        {
                               if (data.arrival_address != null  && data.arrival_address.length > 0)
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

                              if (data.arrival_address != null  && data.arrival_address.length > 0)
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address + ' jusque á ' + data.arrival_address;
                            else
                                trip_details.title = 'Traject au KM depuis ' + data.departing_address;
                        }
                        break;
                    case '2':
                        {
                             if (data.arrival_address != null  && data.arrival_address.length > 0)
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