/// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    set_table_drivers();

})
var table = null;



function set_table_drivers() {


    $('#drivers').jtable({
        title: 'drivers',
        actions: {
            listAction: 'drivers'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {

            id: {
                key: true
            },
            last_name: {
                title: 'Fullname',
                width: '20%',
                display: function (data) {
                    return data.record.user.Fullname;
                }
            }
        },

        selectionChanged: function () {

            selected_row = $('#drivers').jtable('selectedRows').data('record');
            view('/users/' + selected_row.user_id + '/edit', { flow: 'Drivers' });

        }
    });


    $("#drivers").jtable('load');


}

