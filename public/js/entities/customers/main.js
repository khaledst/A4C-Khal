  /// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {
    set_customers_table();

   
})

  function set_customers_table() {


    $('#customers').jtable({
        title: 'customers',
        actions: {
            listAction: 'customers'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {

            first_name: {
                title: 'Firstname',
                width: '40%',
                display: function (data) {
                    return data.record.user.first_name;
                }
            },
            last_name: {
                title: 'Lastname',
                width: '20%',
                display: function (data) {
                    return data.record.user.last_name;
                }
            }
        },

        selectionChanged: function () {

            selected_row = $('#customers').jtable('selectedRows').data('record');
            view('/users/' + selected_row.user_id + '/edit');

        }
    });


    $("#customers").jtable('load');


}