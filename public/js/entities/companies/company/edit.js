var mode = 'new';
var address = null;
var place = null;

$(document).ready(function () {

    active_tabs('tabs');
    form_inicialization();


})

function create_mangopay(id) {

    $.get('mango/company/edit/' + id).done(function (data) {

        data = JSON.parse(data)
        parse_status(data);
        if (data.result)
            view('/companies/' + id + '/edit');
    })
}

function form_inicialization() {


    //get form Mode
    mode = $(".company").data("mode");
    role = $(".company").data("role");

    // set trade date
    $('#trade_register_date_ctrl').datepicker();


    set_upload();
    //defines is activ or not
    $("#check-active").bootstrapSwitch();
    set_switch($("#check-active"));


    //set combobox country value
    $("#country").val($("#country").data("selected")).change();
    $("#company_id").val($("#company_id").data("selected")).change();
    //Address

    var company_address = new google.maps.places.Autocomplete(document.getElementById('address'));
    google.maps.event.addListener(company_address, 'place_changed', function () {
        place = company_address.getPlace();
        address = place.formatted_address;

    });


    $(".company").find(".submit").click(function () {

         mode = $(".company").data("mode");
        var validator = $(".company").validate();
        validator.form();

        if (validator.errorList.length == 0) {

            var company = get_company();
            if (mode == 'edit')
                company.id = $(".company").data("id");


            company.name = $(".company").find("#name").val();
            company.tva =$(".company").find("#tva").val();
            company.country_id = $(".company").find("#country_id").val();
            company.address = $(".company").find("#address").val();
            company.address_number = $(".company").find("#address_number").val();
            company.address_code_postal = $(".company").find("#address_code_postal").val();
            if (place != null) {
                company.lat = place.geometry.location.lat();
                company.lng = place.geometry.location.lng();
            }
            company.domain = $(".company").find("#domain").val();
            company.email = $(".company").find("#email").val();
            company.phone1 = $(".company").find("#phone1").val();
            company.phone2 = $(".company").find("#phone2").val();
            company.trade_register_number = $(".company").find("#trade_register_number").val();
            company.driver_licence_number = $(".company").find("#driver_licence_number").val();
            company.active = ($(".company").find("#check-active").prop("checked")) ? 1 : 0;
            company.type = 'client';
            company.theme = $(".company").find("#theme").val();
            company.description = $(".company").find("#description").val();
            company.subtitle = $(".company").find("#subtitle").val();
            company.root_path = $(".company").find("#root_path").val();
            company.trade_register_date = get_date_picker($(".company").find("#trade_register_date").val());


            var formData = new FormData();
            formData.append("company", JSON.stringify(company));

            var files = $(".input_file_img_preview").prop('files');


            if (files.length > 0) {
                var file = $(".input_file_img_preview").prop('files')[0];
                formData.append("img", file);
            }



            $.ajax({
                url: "companies/save",
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

                        view('companies/dashboard');
                    }
                },
                error: function () {

                }
            })


        }


        return false;
    })
};


function get_company() {
    var company = new Object();

    company.id = null;
    company.name = null;
    company.tva = null;
    company.country_id = null;
    company.address = null;
    company.address_number = null;
    company.address_code_postal = null;
    company.trade_register_date = null;
    company.lat = null;
    company.lng = null;
    company.domain = null;
    company.email = null;
    company.phone1 = null;
    company.phone2 = null;
    company.trade_register_number = null;
    company.mangopay_user_id = null;
    company.driver_licence_number = null;
    company.active = null;
    company.description = null;
    company.subtitle = null;
    company.root_path = null;
    return company;


}