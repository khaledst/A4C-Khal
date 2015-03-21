var mode = 'new';
var role = 'user';
var data = [];
$(document).ready(function () {
    //set tabs
    active_tabs('tabs');

    //set bookings related to the cars
    active_tabs('booking-interval-tabs');
    //set user forms
    form_inicialization();


})

var img_upload_interval = 0;

function form_inicialization() {

    img_upload_interval = 0;
    //get form Mode
    mode = $(".car").data("mode");
    role = $(".car").data("role");

    $("#company_id").val($("#company_id").data("selected")).change();
    //set image upload
    set_upload();

    //set active switch
    $("#check-active").bootstrapSwitch();
    set_switch($("#check-active"));

    if (role == 'super-admin') {

        //set company
        $(".car").find("#company_id").val($(".car").find("#company_id").data("selected")).change();
    }



    $(".car").validate({
        submitHandler: function (form) {



            var car = get_car();
            if (mode == 'edit')
                car.id = $(".car").data("id");

            car.brand = $(".car").find("#brand").val();
            car.model = $(".car").find("#model").val();
            car.number = $(".car").find("#number").val();
            car.kms = $(".car").find("#kms").val();
            car.active = ($(".car").find("#check-active").prop("checked")) ? 1 : 0;
            car.description = $(".car").find("#description").val();


            if (role == 'super-admin') {
                car.company_id = $(".car").find("#company_id").val();
            }

            var formData = new FormData();
            formData.append("car", JSON.stringify(car));

            var files = $(".input_file_img_preview").prop('files');


            if (files.length > 0) {
                var file = $(".input_file_img_preview").prop('files')[0];
                formData.append("img", file);
            }



            $.ajax({
                url: "cars/save",
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

                         view('/cars/dashboard');
                    }
                },
                error: function () {

                }
            })

        }
    });


};


function get_car() {
    var car = new Object();
    car.id = null;
    car.brand = null;
    car.model = null;
    car.number = null;
    car.kms = null;
    car.minute_unit = 0;
    car.kms_unit = 0;

    car.active = null;

    if (role == 'super-admin') {
        car.company_id = null;
    }
    return car;


}
