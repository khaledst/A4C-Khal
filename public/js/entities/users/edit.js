var mode = 'new';

$(document).ready(function () {
    form_inicialization();


})


function form_inicialization() {


    //get form Mode
    mode = $("#offer").data("mode");


    //set active switch
    $("#check-active").bootstrapSwitch();
    set_switch($("#check-active"));

    //set admin switch
    $("#check-admin").bootstrapSwitch();
    set_switch($("#check-admin"));

    //set customer switch
    $("#check-customer").bootstrapSwitch();
    set_switch($("#check-customer"));
    //set driver switch
    $("#check-driver").bootstrapSwitch();
    set_switch($("#check-driver"));

    //set company
    $(".user").find("#company_id").val($(".user").find("#company_id").data("selected")).change();


    $(".user").validate({
        submitHandler: function (form) {



            var user = get_user();
            if (mode == 'edit')
                user.id = $(".user").data("id");

            user.title = $(".user").find("#title").val();
            user.first_name = $(".user").find("#first_name").val();
            user.last_name = $(".user").find("#last_name").val();
            user.active = ($(".user").find("#check-active").prop("checked")) ? 1 : 0;
            user.password = $(".user").find("#password").val();
            user.username = $(".user").find("#username").val();
            user.email = $(".user").find("#email").val();
            user.admin = ($(".user").find("#check-admin").prop("checked")) ? 1 : 0;
            user.company_id = $(".user").find("#company_id").val();

            var customer = ($(".user").find("#check-customer").prop("checked")) ? 1 : 0;
            var driver = ($(".user").find("#check-driver").prop("checked")) ? 1 : 0;

            var data = { user: user, customer: customer, driver: driver, mode: mode };
            $.post("users/save", data).done(function (data) {

                var status = JSON.parse(data);
                parse_status(status);

                if (status.result) {

                    $.get("users/dashboard").done(function (data) {
                        $("#content").html(data);

                    })

                }

            })

        }
    });


};




function get_user() {
    var user = new Object();
    user.id = null;
    user.title = null;
    user.company_id = null;
    user.first_name = null;
    user.last_name = null;
    user.password = null;
    user.username = null;
    user.email = null;
    user.admin = null;
    user.active = null;
   
    return user;


}