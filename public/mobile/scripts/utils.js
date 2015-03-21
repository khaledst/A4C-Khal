
function parse_status(data) {

    switch (data.status) {
        case 'success':
            toastr.success(data.msg);
            break;
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


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function disconnect() {

    var data = get_data();
    data.interval = "day";

    $.ajax({
        url: api + 'driver/logout',
        xhrFields: {
            withCredentials: false
        },
        type: 'GET',
        dataType: 'json',
        data: data,
        success: function (data) {

            window.location = "index.html";


        },
        error: function () {

            toastr.error("ERROR WHEN DICONNECTING");

            setTimeout(function () {
                window.location = "index.html";

            }, 3000);

        }
    });



}

function get_data() {
    var data = { 'app_chauffer_token': readCookie('app_chauffer_token') };
    return data;
}



function get_diference_data(dStart, dEnd) {

    var timeStart = new Date(dStart).getTime();
    var timeEnd = new Date(dEnd).getTime();
    var hourDiff = timeEnd - timeStart; //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var humanReadable = {};
    humanReadable.hours = Math.floor(hDiff);
    humanReadable.minutes = minDiff - 60 * humanReadable.hours;
    console.log(humanReadable);
    return humanReadable;

}