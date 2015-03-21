/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {
    
    
    
    
    set_cars_table();

    $(".edit").click(function () {
         
          view('/cars/-1/edit');
    
    })
})

function set_cars_table() {


    $('#cars').jtable({
        title: 'cars',
        actions: {
            listAction: 'cars'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {

            brand: {
                title: 'brand',
                width: '20%',
                display: function (data) {
                    return data.record.brand;
                }
            },
            model: {
                title: 'model',
                width: '30%',
                display: function (data) {
                    return data.record.model;
                }
            },
            number: {
                title: 'Car ID',
                width: '15%',
                display: function (data) {
                    return data.record.number;
                }
            },
            kms: {
                title: 'kms',
                width: '20%',
                display: function (data) {
                    return data.record.kms;
                }
            },
            kms_unit: {
                title: 'kms / Unit Price',
                width: '15%',
                display: function (data) {
                    return data.record.km_unit;
                }
            }
        },

        selectionChanged: function () {

            selected_row = $('#cars').jtable('selectedRows').data('record');
            console.log(selected_row);
            view('/cars/' + selected_row.id + '/edit');

        }
    });


    $("#cars").jtable('load');


}