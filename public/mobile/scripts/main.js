/// <reference path="jquery-2.1.0-vsdoc.js" />

var api = 'http://37.187.140.172/';
//var api = 'http://localhost:8090/';

$(document).ready(function () {
    eraseCookie('app_chauffer_token');
    set_authentication_form();
})

function set_authentication_form() {


    $(".authentication").validate({
        submitHandler: function (form) {

            var user = new Object();
            user.username = $(".authentication").find("#username").val();
            user.password = $(".authentication").find("#password").val();
            user.remember = ($(".authentication").find("#remember").prop("checked")) ? true : false;


            $.get(api + "/users/login", user).done(function (data) {
                var IS_JSON = false;

                try {

                    var data = JSON.parse(data);
                    parse_status(data);

                    if (data.result == true) {

                        if (data.admin || data.super_admin) {



                        }
                        if (data.driver) {
                            createCookie('app_chauffer_token', data.token, 1);
                            window.location = 'mybookings.html';


                        }

                    }


                }
                catch (e) {
                    IS_JSON = false;
                }

            }).error(function () {



            })

        }
    });



}


