/// <reference path="../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {


})
function add_comment(type, msg, obj) {
    var comment = $('<div><span class="label label-' + type + '"><i class="fa fa-comment"></i></span> <span>&nbsp;' + msg + '</span></div>');
    $(obj).append(comment);
}


function set_check_boxes()
{

    $('.checkbox-inline').click(function () {

        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

    });
    
}

function set_upload() {

    //start KNOB LOADER FOR IMAGE
    $(".upload_status").knob({
        'width': 120,
        'change': function (v) { }
    });


    //set image clicks events to fire upload control
    $(".img_preview, .img_edit").click(function () {

        $(".input_file_img_preview").click();

    })


    $('.upload_status').attr("value", 0).change();


    //SET Upload function

    $(".input_file_img_preview").change(function () {


        img_upload_interval = null;


        var files = $(".input_file_img_preview").prop('files');


        if (files.length > 0) {
            var file = $(".input_file_img_preview").prop('files')[0];
            var size = file.size / 1024000;

            if (size < 1) {
                var filename = file.name;
                var index_dot = reverse(filename).indexOf('.')
                var ext = filename.substring(filename.length - index_dot);



                if (ext.match('/gif|png|jpg|GIF|PNG|JPG/').length > 0) {

                    var readImg = new FileReader();


                    readImg.onload = (function (file) {
                        return function (e) {
                            var d = new Date()

                            $(".img_preview").attr('src', e.target.result);
                            $(".img_preview2").attr('src', e.target.result);
                            $(".img_edit").attr('src', e.target.result);
                            $('.upload_status').attr("value", 100).change();
                        };
                    })(file);

                    readImg.readAsDataURL(file);



                    var i = 0;
                    img_upload_interval = setInterval(function () {
                        $('.profile .picture canvas').fadeIn();
                        $('.edit canvas').fadeIn();

                        i = i + 1;

                        $('.upload_status').attr("value", i).change();

                        if (i > 100) {


                            $('.upload_status').attr("value", 100).change();
                            setTimeout(function () {
                                $('.profile .picture canvas').fadeOut();
                                $('.edit canvas').fadeOut();
                                $('.upload_status').attr("value", 0).change();
                            }, 200);

                            clearInterval(img_upload_interval);

                        }
                    }, 4)
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
}

function set_preview_img_class(img) {

    var height = $(img).height();
    if (height > 300) {


        $(img).removeClass("img_preview").addClass("img_preview2");
    }
    else {
        $(img).removeClass("img_preview2").addClass("img_preview");

    }

}

function active_tabs(ref) {
    var tabs_selectors = $('.' + ref);

    var tabs_containers = $("[data-tabs='" + ref + "']");
    $(tabs_selectors).find("li").css("cursor", "pointer");
    $(tabs_selectors).find("li").click(function () {

        $(tabs_selectors).find("li").removeClass("active");
        $(this).addClass("active");
        $(tabs_containers).find(".tab-pane.active").first().removeClass("active");
        $(tabs_containers).find("#" + $(this).data("tab")).addClass("active");


    })
}

var now = new Date();


function get_date() {
    return parse_date(now).substr(0, 10).replace('/', '-').replace('/', '-');
}

function get_time() {

    var HOURS = now.getHours();
    if (HOURS < 10)
        HOURS = '0' + HOURS;

    var MINUTES = now.getMinutes();
    if (MINUTES < 10)
        MINUTES = '0' + MINUTES;


    var time = HOURS + ':' + MINUTES;

    return time;

}

function parse_status(data) {

    switch (data.status) {
        case 'success':
            toastr.success(data.msg);
            break;
        case 'warning':
            toastr.warning(data.msg);
            break;
        case 'error':
            toastr.error(data.msg);
            break;
    }


}


//get a view by name and vinds the content to theelement #content
function view(controller, data) {

    $.get(controller, data).done(function (data) {
        $("#content").html(data);
    })

}

function get_front_view(api) {

    $(".dashboard_loader").show();
    $("#section7 .container").fadeOut();

    $.get(api).done(function (data) {
        setTimeout(function () {
            $("#section7 .container").html(data);
            $(".dashboard_loader").hide();
            $("#section7 .container").fadeIn();
        }, 200);

    }).error(function () {
        $(".dashboard_loader").hide();

    })

}


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


// helper to reverse a string

function reverse(str) {
    var new_str = "";
    var str_len = str.length - 1;



    while (str_len > -1) {
        new_str = new_str + str[str_len]
        str_len = str_len - 1;

    }


    return new_str;

}

//setbind switch
function set_switch(ref) {
    var value = ref.data("value");
    $(ref).prop("checked", value).change()
}

//set bind slidder
function set_slider(element) {
    var value = $("#" + element).data("value");
    $("#" + element).slider("value", value);
    $('#step-' + element).text(value + ' KM');
}
//set bind checkboxes

function bind_checkboxes_api(api, element, field) {

    $.post(api, null).done(function (data) {

        data = JSON.parse(data);
        var checboxes = data.Records;
        $.each(checboxes, function (i, item) {
            z = item;
            console.log(item);

            var checkbox_control = $('<label class="btn checkbox-inline btn-checkbox-default-inverse"></label>');

            attribute_tree = field.split('->');
            var text_attr = null;

            $(attribute_tree).each(function (j, item_j) {

                if (text_attr == null)
                    text_attr = $(item).attr(item_j);
                else
                    text_attr = $(text_attr).attr(item_j);

            });


            $(checkbox_control).text(text_attr);
            $(checkbox_control).append('<input type="checkbox" value="warning-inverse2"></input>');
            $(checkbox_control).find("[type='checkbox']").attr("data-id", item.id);

            $(element).append(checkbox_control);

        })
    })
}


//GOOGLE MAPS HELPERS
//global 


function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


//From an array of routes return the route more fastest in time 
function best_time_route(routes) {


    var min_duration = min_duration_route(routes);

    route = $(routes).filter(function () {
        return (this.legs[0].duration.value == min_duration);
    });

    if (route.length > 0)
        return route[0];
    else
        return null;

}

//From an array of routes return the route more fastest in distance
function best_distance_route() {

    var min_distance = min_distance_route(routes);
    route = $(routes).filter(function () {
        return (this.legs[0].distance.value == min_distance);
    });
    if (route.length > 0)
        return route[0];
    else
        return null;

}

//From an array of route find the route with the smallest time
function min_duration_route(routes) {
    var min_duration = null;
    $(routes).each(function (i, item) {

        var duration = item.legs[0].duration.value;
        if (min_duration == null)
            min_duration = duration;
        else
            if (duration < min_duration)
                min_duration = duration;

    })

    return min_duration;
}


//From an array of route find the route with the smallest distance
function min_distance_route(routes) {
    var min_distance = null;
    $(routes).each(function (i, item) {

        var distance = item.legs[0].distance.value;
        if (min_distance == null)
            min_distance = distance;
        else
            if (distance < min_distance)
                min_distance = distance;

    })

    return min_distance;
}

function get_date_picker(date) {

    return date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2)
}

function parse_date_picker(date) {

    return date.substring(0, 2) + '-' + date.substring(3, 5) + '-' + date.substring(6, 10);
}


function parse_date_picker2(date) {

    return date.substring(3, 5)  + '-' + date.substring(0, 2)  + '-' + date.substring(6, 10);
}

//DATE TIME HELPERS
//return a date i format YYYY-MM--DD HH:MM:SS that can be used to send to the server
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

//sum seconds to given date in javascript
function sum_to_date(date_str, seconds) {
    var date = new Date(date_str);
    date = new Date(date.getTime() + (seconds * 1000))
    return date;
}


//COmpares dates 
// Source: http://stackoverflow.com/questions/497790
var dates = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0], d[1], d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year, d.month, d.date) :
            NaN
        );
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a = this.convert(a).valueOf()) &&
            isFinite(b = this.convert(b).valueOf()) ?
            (a > b) - (a < b) :
            NaN
        );
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

//TIMES TIMESHEET
//set time in agenda

function get_interval() {

    var interval = new Object();

    interval.user_id = null;
    interval.day_week = null;
    interval.start = null;
    interval.end = null;
    return interval;

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
var active_cell = '<div class="active"><div>';