/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    console.log("loading companies");


    set_actions();
    set_table_companies();
})

function set_actions() {

    $(".new").click(function () {

        view('companies/-1/edit', null);

    });

}

function set_table_companies() {


    $('#companies').jtable({
        title: 'companies',
        actions: {
            listAction: 'companies/get'
        },
        paging: true, //Enable paging
        sorting: true,
        selecting: true,
        fields: {
            id: {
                key: true,
              list: false,
                
            },
            name: {
                title: 'Name',
                width: '20%',
                display: function (data) {
                    return data.record.name;
                }
            },
            address: {
                title: 'Name',
                width: '20%',
                display: function (data) {
                    return data.record.name;
                }
            },
            trade_register_number: {
                title: 'Trade Number',
                width: '20%',
                display: function (data) {
                    return data.record.trade_register_number;
                }
            }
        },

        selectionChanged: function () {

            selected_row = $('#companies').jtable('selectedRows').data('record');
            view('/companies/'+ selected_row.id + '/edit');


        }
    });


    $("#companies").jtable('load');


}