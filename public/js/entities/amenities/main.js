  /// <reference path="../../jquery-2.1.0-vsdoc.js" />

$(document).ready(function () {

    set_table_drivers();

})
var table = null;



function set_table_drivers() {


    $('#amenities').jtable({
        title: 'extras',
        actions: {
            listAction: 'amenities'
        },
        paging: true, //Enable paging
        //pageSize: 10, //Set page size (default: 10)
        sorting: true,
        selecting: true,
        fields: {

            title: {
                title: 'title',
                width: '40%',
                display: function (data) {
                    return data.record.user.first_name;
                }
            }
        
        },

        selectionChanged: function () {

            //selected_row = $('#drivers').jtable('selectedRows').data('record');
            //console.log(selected_row);
            //view('/drivers/times/dashboard/' + selected_row.id);

        }
    });


    $("#amenities").jtable('load');


}

