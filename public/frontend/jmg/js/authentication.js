/// <reference path="../../js/jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    form__login_inicialization();
    set_logout();
})

function form__login_inicialization() {



    $(".register_btn").click(function () {
        $(".authentication_ctrl").hide();
        $(".register_control").slideDown();

    });

    $(".show_authentication_ctrl").click(function () {
        $(".register_finnish_ctrl").hide();
        $(".authentication_ctrl").slideDown();

    });

    $(".authentication").validate({
        submitHandler: function (form) {

            var user = new Object();
            user.username = $(".authentication").find("#username").val();
            user.password = $(".authentication").find("#password").val();
            user.remember = ($(".authentication").find("#remember").prop("checked")) ? true : false;


            $.get("/users/login", user).done(function (data) {
                var IS_JSON = false;

                try {

                    var data = JSON.parse(data);
                    parse_status(data);

                    if (data.result == true) {

                        if (data.admin || data.super_admin) {

                            $('.opt-admin').remove();
                            var option_admin = "<li><a class='opt-admin' href='admin'>Admin</a></li>";
                            $(".authentication-control .options").prepend(option_admin);

                        }


                        $("#section6").slideUp();
                        set_auth_ui();
                        $html = $('html, body');
                        $html.animate({ scrollTop: $("#bookings-section").offset().top - 50 });





                    }


                }
                catch (e) {
                    IS_JSON = false;
                }




            })

        }
    });



    $(".register").validate({
        submitHandler: function (form) {

            var user = new Object();
            user.username = $(".register").find("#r_username").val();
            user.p = $(".register").find("#r_password").val();
            user.email = $(".register").find("#email").val();


            $.get("/users/register", user).done(function (data) {
                var IS_JSON = false;
                var data = JSON.parse(data);
                parse_status(data);

                if (data.result) {


                    $(".register_control").hide();
                    $(".register_finnish_ctrl").slideDown();



                }



            })

        }
    });


};

function set_auth_ui() {
    $(".authentication-control").find(".item").removeAttr("href");
    $(".authentication-control").find(".item").attr("data-toggle", "dropdown");
    $(".authentication-control").find(".item").html(logou_ui());
    $(".authentication-control").find(".logout").unbind("click");
    set_logout();

}

function logou_ui() {
    return 'SE DECONNECTER <i class="fa fa-fw fa-power-off"></i>';

}
function login_ui() {
    $(".authentication-control").find(".item").unbind("click");
    return 'SE CONNECTER <i class="fa fa-fw fa-power-off text-danger"></i>';
}

function set_logout() {

    $(".authentication-control").find(".logout").click(function () {
        $(".authentication-control").find(".item").removeAttr("data-toggle");
        $(".authentication-control").find(".item").html(login_ui());
        $(".authentication-control").find(".item").attr("href", "#section6");
        $(".authentication-control").removeClass("open");
        $("#section6").slideDown();
        $("#bookings-section").remove();
        $(".opt-admin").remove();
        $.get("users/logout").done(function () { });

    })

}