
$(document).ready(function () {

    $(".timesheet-week-work").click(function () {

        set_timesheet_fullday(0, 5);

    })

    $(".timesheet-week-end").click(function () {

        set_timesheet_fullday(5, 2);

    })

    $(".timesheet-week-all").click(function () {

        set_timesheet_fullday(0, 7);

    })

     $(".timesheet-clear-all").click(function () {

        set_timesheet_fullday(0, 0);

    })


    //timesheet Controls   
    $(".btn-timesheet").click(function () {

        var mode = $(this).data("mode");

        if (mode == "collapsed") {
            $("#timesheet_wrapper").slideDown();
            $(this).text("Hide");
            $(this).data("mode", "expanded");
        }
        else {
            $("#timesheet_wrapper").slideUp();
            $(this).data("mode", "collapsed");
            $(this).text("Show");
        }



    });
})

var cell = null;
function set_active(obj) {

    var div = $("<div class='1'></div>");
    setTimeout(function () {
        div.parent().addClass("active-time");
        div.remove();
    }, 50);
    

    return div;
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

            if (cell.hasClass("active-time") && interval == null) {

                if (j < 23) {
                    interval = get_interval();
                    interval.start = $(row).attr("hour");
                    interval.day_week = $(column).text().substring(0, 3);
                }
                else {


                    interval = get_interval();
                    interval.start = $("#timesheet .jtable tbody tr").eq(j).attr("hour");
                    interval.day_week = $(column).text().substring(0, 3);
                    interval.end = '23:59';
                    Intervals.push(interval);
                    interval = null;
                }

            }
            else {
                if (interval != null && cell.hasClass("active-time") == false) {

                    interval.end = $("#timesheet .jtable tbody tr").eq(j).attr("hour");

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

function load_timesheet(id, api) {
    //ex:api
    //'offers/timesheet/'
    $('#timesheet').jtable({
        title: 'Timesheet',
        paging: false, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: false,
        actions: {
            listAction: api + id
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
                    if ($(this).hasClass("active-time")) {
                        $(this).removeClass("active-time");
                    }
                    else {
                        $(this).addClass("active-time");
                    }

                }
            }

        });



        $("#timesheet .jtable tbody tr td").mousedown(function (ev) {


            if ($(ev.target).hasClass("hour") == false) {
                paint = true;
                if (paint) {
                    if ($(this).hasClass("active-time")) {
                        $(this).removeClass("active-time");
                    }
                    else {
                        $(this).addClass("active-time");
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

function set_timesheet_fullday(skip, days) {
    clean_timesheet();

    $("#timesheet .jtable thead tr th").slice(skip + 1, days + skip + 1).each(function (i, column) {

        var index = $(column).index();

        var interval = null;


        $("#timesheet .jtable tbody tr").each(function (j, row) {

            var cell = $(row).find("td").eq(index);
            cell.addClass("active-time");
        });



    });

}

function clean_timesheet() {

    $("#timesheet .jtable thead tr th").slice(1, 8).each(function (i, column) {

        var index = $(column).index();

        var interval = null;


        $("#timesheet .jtable tbody tr").each(function (j, row) {

            var cell = $(row).find("td").eq(index);
            cell.removeClass("active-time");
        });

    });

}

function get_time_object() {

    var time = new Object();
    time.id;
    time.day_week = null;
    time.start = null;
    time.end = null;
    time.created_at = null;
    time.updated_at = null;
    time.user_id = null;
    return time;

}
