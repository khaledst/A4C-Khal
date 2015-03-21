var mode = 'new';
var role = 'user';
var address = null;
var data = [];
$(document).ready(function () {
    //set tabs
    active_tabs('tabs');
    //set user forms
    form_inicialization();

    //set checkboxes
     set_check_boxes();

    if ($("#overview").data("customer") == 1) {
        active_tabs('booking-interval-tabs');
    }

    if ($("#edit-driver-profile").length > 0) {
        var user_id = $(".user").data("id");
        load_timesheet(user_id, 'drivers/timesheet/');
    }
})




function form_inicialization() {


    //get form Mode
    mode = $(".user").data("mode");
    role = $(".user").data("role");



    //set licende date picker

    $('#license_expiration_ctrl').datepicker();

    if (role == 'admin' || role == 'super-admin') {
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

    
    }


    set_upload();
    //set adrees
    //address_input = new google.maps.places.Autocomplete(document.getElementById('address'));
    //google.maps.event.addListener(address_input, 'place_changed', function () {
    //    address = address_input.getPlace();

    //});


    $(".user, .driver-form").validate({
        submitHandler: function (form) {


            var user = get_user();
            if (mode == 'edit')
                user.id = $(".user").data("id");

            user.title = $(".user").find("#title").val();
            user.first_name = $(".user").find("#first_name").val();
            user.last_name = $(".user").find("#last_name").val();
            user.country_id = $(".user").find("#country_id").val();
            if (address != null)
                user.address = address.formatted_address;
            else
                user.address = $(".user").find("#address").val();
            user.address_number = $(".user").find("#address_number").val();
            user.address_code_postal = $(".user").find("#address_code_postal").val();
            user.password = $(".user").find("#password").val();
            user.username = $(".user").find("#username").val();
            user.email = $(".user").find("#email").val();
            user.phone = $(".user").find("#username").val();
            user.email = $(".user").find("#email").val();
            data = { user: user, mode: mode };

            var formData = new FormData();


            if (role == 'admin' || role == 'super-admin') {

                user.active = ($(".user").find("#check-active").prop("checked")) ? 1 : 0;

                user.admin = ($(".user").find("#check-admin").prop("checked")) ? 1 : 0;
                var customer = ($(".user").find("#check-customer").prop("checked")) ? 1 : 0;

                if (role == 'super-admin') {
                    user.company_id = $(".user").find("#company_id").val();
                }


                var driver = new Object();
                driver.active = ($(".user").find("#check-driver").prop("checked")) ? 1 : 0;

                if (is_driver) {


                    driver.license_number = $(".driver-form").find("#license_number").val();
                    driver.license_expiration = get_date_picker($(".driver-form").find("#license_expiration").val());


                    var intervals = get_time_table();
                    formData.append("timesheet", JSON.stringify(intervals));
                }
                formData.append("driver", JSON.stringify(driver));
                var cars = $(".driver-form").find("#cars").find(".active");
                cars = get_array_by_attribute(cars, 'id', get_driver_car, 'car_id');
                formData.append("cars", JSON.stringify(cars));

                formData.append("customer", JSON.stringify(customer));


            }



            formData.append("user", JSON.stringify(user));

            var files = $(".input_file_img_preview").prop('files');


            if (files.length > 0) {
                var file = $(".input_file_img_preview").prop('files')[0];
                formData.append("img", file);
            }



            $.ajax({
                url: "users/save",
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (XHR) {


                },
                success: function (data) {
                    var status = JSON.parse(data);
                    parse_status(status);

                    if (status.result) {
                        if(is_admin)
                            view('users/dashboard');

                    }
                },
                error: function () {

                }
            })



        }
    });


};


function get_user() {
    var user = new Object();
    user.id = -1;
    user.title = null;
    user.first_name = null;
    user.last_name = null;
    user.password = null;
    user.username = null;
    user.email = null;

    if (role == 'admin' || role == 'super-admin') {
        user.admin = null;
        user.active = null;
    }

    if (role == 'super-admin') {
        user.company_id = null;
    }
    return user;


}


function get_driver_car() {

    var DriverCar = new Object();
    DriverCar.driver_id = null;
    DriverCar.car_id = null;

    return DriverCar;
}


