
var current_driver = null;
var driver_times = null;
$(document).ready(function () {

    current_driver = $("#horaires").data("driver-id");
    set_table_horaires()


    $("[data-action='save']").click(function () {

        $.get('/users/times/save/' + $("#horaires").data("user-id"), { data: get_times() }).done(function () {

        }).error(function () {

        })
    })

})


var table = null;
var mousedown = false;

function bind_driver_routes(data) {
  
    $(data).each(function () {
     

        var day_index = $("[data-day='" + this.day_week + "']").index();

        var start_row = $("#horaires tbody").find("[data-start='" + this.start + "']");


        var end_row = $("#horaires tbody").find("[data-end='" + this.end + "']");

     

        var rows = end_row - start_row;

        console.log("start" + this.start + '--- end' + this.end );
        console.log(day_index + '-' + start_row.index() + '-' + end_row.index());
        if(start_row.index() > end_row.index())
        {
           
            for (i = start_row.index() ; i <= $("#horaires tbody tr").length; i++)
            {

                $("#horaires tbody tr").eq(i).find("td").eq(day_index).removeClass("interval").addClass('marked');

            }

            for (i = 0 ; i <= end_row.index(); i++) {

                $("#horaires tbody tr").eq(i).find("td").eq(day_index).removeClass("interval").addClass('marked');
            }
        }
        else
        {

            for (i = start_row.index() ; i <= end_row.index(); i++) {
              
                $("#horaires tbody tr").eq(i).find("td").eq(day_index).removeClass("interval").addClass('marked');

            }

        }

 

    })

}



function set_table_horaires() {

    table = $('#horaires').dataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "iDisplayLength": 50,
        "sDom": '<"top">rt<"bottom"flp><"clear">',
        "sDom": '<"bottom"><"clear">',
        "aaSorting": []
    });




    $('#horaires tbody tr .interval,.marked').mousedown(function () {
        mousedown = true;

        if ($(this).hasClass("interval")) {

            $(this).removeClass('interval');
            $(this).addClass('marked');

        } else {

            console.log("mouse down");
            $(this).removeClass('marked');
            $(this).addClass('interval');

        }

    });

    $('#horaires tbody tr .interval ,.marked').mouseover(function () {

        if (mousedown) {
            if ($(this).hasClass("interval")) {
                $(this).removeClass('interval');
                $(this).addClass('marked');
            } else {
                $(this).removeClass('marked');
                $(this).addClass('interval');

            }
        }

    });
    $('#horaires tbody tr .interval,.marked').mouseup(function () {

        mousedown = false;
        console.log("mouse up" + mousedown);
    });




}


var times = [];

function get_column_horaires(weekday) {

    var day_index = $("[data-day='" + weekday + "']").index();
    var time = null;


    $("#horaires tbody tr").each(function (i, item) {


        var status = $(this).find("td").eq(day_index).attr("class").trim();

        if (status == 'marked' && time == null) {

            time = get_time_object();
            time.start = $(item).data("start");
            time.day_week = weekday;
            time.user_id = $("#horaires").data("user-id");

        }
        else {

            if (status == 'interval' && time != null) {
                time.end = $("#horaires tbody tr").eq(i - 1).data("end");
                times.push(time);
                time = null;
            }


        }
    })

    //   console.log(times);

}

function get_times() {
    times = [];
    $("#horaires thead tr [data-day]").each(function (i, item) {

        var day = $(item).data("day");
        get_column_horaires(day);
    })

    return times;

}