var Intervals = [];
var current_user = null;
$(document).ready(function () {

    set_save_time_table();

    $("[data-action='timesheet-week-work']").click(function () {

        set_timesheet_fullday(0, 5);

    })

    $("[data-action='timesheet-week-end']").click(function () {

        set_timesheet_fullday(5, 2);

    })

    $("[data-action='timesheet-week-all']").click(function () {

        set_timesheet_fullday(0, 7);

    })


})





function load_time_table(id) {
    current_user = id;

    $('#timesheet').jtable({
        title: 'Timesheet',
        paging: false, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: false,
        actions: {
            listAction: 'drivers/timesheet/' + id
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


function set_save_time_table() {

    $("[data-action='save']").click(function () {

        Intervals = [];
        if (current_user > 0) {

            Intervals = [];
            $("#timesheet .jtable thead tr th").slice(1).each(function (i, column) {

                var index = $(column).index();



                var interval = null;
                $("#timesheet .jtable tbody tr").each(function (j, row) {

                    var cell = $(row).find("td").eq(index);

                    if (cell.hasClass("active") && interval == null) {

                        if (j < 23) {
                            interval = get_interval();
                            interval.user_id = current_user;
                            interval.start = $(row).attr("hour");
                            interval.day_week = $(column).text().substring(0, 3);
                        }
                        else {


                            interval = get_interval();
                            interval.user_id = current_user;
                            interval.start = $("#timesheet .jtable tbody tr").eq(j).attr("hour");
                            interval.day_week = $(column).text().substring(0, 3);
                            interval.end = '23:59:59';
                            Intervals.push(interval);
                            interval = null;
                        }

                    }
                    else {
                        if (interval != null && cell.hasClass("active") == false) {

                            interval.end = $("#timesheet .jtable tbody tr").eq(j).attr("hour");

                            Intervals.push(interval);
                            interval = null;
                        } else {


                            if (interval != null && j == 23) {

                                interval.end = '23:59:59';
                                Intervals.push(interval);
                                interval = null;

                            }


                        }

                    }
                })

            })



            $.get('/drivers/timesheet/save/' + current_user, { data: Intervals }).done(function (data) {

                load_time_table(current_user);


            }).error(function () {



            })
        }

    })

}




